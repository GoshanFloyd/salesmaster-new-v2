import {Component, OnInit, ViewChild} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {UserModel} from '../../models/user.model';
import {UserRepository} from '../../repositories/user.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentModel} from '../../models/document.model';
import {DirectoryService} from '../../services/directory.service';
import {DirectoryModel} from '../../models/directory.model';
import {Observable} from 'rxjs/Observable';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {PercentRepsponse} from '../../classes/percent.class';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'app-directory-single',
  templateUrl: './directory-single.component.html',
  styleUrls: ['../file-manager.component/file-manager.css'],
  host: {class: 'grid-row'}
})

export class DirectorySingleComponent implements OnInit {

  @ViewChild('modalUpload') private modalUpload: ModalStandardComponent;

  private _currentDirectoryID: number;

  private _formData: FormData = new FormData();

  public isFile: boolean = false;

  public currentDirectory: DirectoryModel = null;

  private _documentsList: Array<DocumentModel> = [];

  public disableLoadButton: boolean = false;

  public _formUploadDocument: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required)
  });

  constructor (private _documentService: DocumentService,
               private _directoryService: DirectoryService,
               private _userRepository: UserRepository,
               private _activateRoute: ActivatedRoute,
               private _router: Router,
               private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this._currentDirectoryID = this._activateRoute.snapshot.params['id'];
    this.getCurrentDirectory().subscribe(
      data => {
        this.getDocuments();
      },
      err => console.log(err)
    );
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get documentsList(): Array<DocumentModel> {
    const arr: Array<DocumentModel> = this._documentsList;

    return arr;
  }

  public getCurrentDirectory(): Observable<DirectoryModel> {
    return Observable.create(observer => {
      this._directoryService.getDirectory(this._currentDirectoryID).subscribe(
        data => {
          this.currentDirectory = new DirectoryModel(data);
          observer.next(this.currentDirectory);
        },
        err => {
          observer.error(err);
        },
        () => observer.complete()
      );
    });
  }

  public getDocuments(): void {
    this._documentService.getDocuments({
      'directory_id': this._currentDirectoryID
    }).subscribe(
      data => {
        this._documentsList = DocumentModel.fromArray(data);
      },
      err => console.log(err)
    );
  }

  public openUploadModal(): void {
    this.modalUpload.showModal();
  }

  public onChangeFileEvent(event: any){
    this.isFile = true;
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this._formData.append('file', file, file.name);
    }
  }

  public backToStorage() {
    this._router.navigateByUrl(`/file-manager/main/${this.currentDirectory.company.id}`);
  }

  public uploadDocument(event: Event): void {
    event.preventDefault();

    this._formData.append('directory_title', this.currentDirectory.title);
    this._formData.append('employee', this.user.id.toString());
    this._formData.append('title', this._formUploadDocument.controls['title'].value);

    this.disableLoadButton = true;

    this._documentService.uploadDocument(this._formData).subscribe(
      data => {
        if (data instanceof PercentRepsponse) {
          this.modalUpload.percentLoad = data.data;
        }
        if (data instanceof HttpResponse) {
          this._formData = new FormData();
          this._formUploadDocument.reset();
          this.modalUpload.hideModal();
          this.getDocuments();
          this.disableLoadButton = false;
          this.modalUpload.percentLoad = 0;
        }
      },
      err => {
        console.log(err);
        this.disableLoadButton = false;
      }
    );
  }

  public deleteDocument(id: number) {

    const confirmDelete = confirm('Вы действительно хотите удалить выбранный файл?');

    if (confirmDelete) {
      this._documentService.deleteDocument(id).subscribe(data => {
          this.getDocuments();
          this._notificationService.sendNotification({
            title: 'Выбранный файл удален'
          });
        },
        err => console.log(err)
      );
    } else {
      return null;
    }
  }
}
