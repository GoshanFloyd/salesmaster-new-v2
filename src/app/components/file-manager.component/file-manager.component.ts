import {Component, OnInit, ViewChild} from '@angular/core';
import {DirectoryService} from '../../services/directory.service';
import {DirectoryModel} from '../../models/directory.model';
import {UserModel} from '../../models/user.model';
import {UserRepository} from '../../repositories/user.repository';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {DirectoryAddComponent} from '../directory-add.component/directory-add.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-file-manager-main',
  templateUrl: './file-manager.component.html',
  host: {class: 'grid-row'},
  styleUrls: ['./file-manager.css']
})

export class FileManagerComponent implements OnInit {

  @ViewChild('AddDirectoryModal') private addDirectoryModal: ModalStandardComponent;
  @ViewChild('DirectoryAddComponent') private directoryAddComponent: DirectoryAddComponent;

  private _directoriesList: Array<DirectoryModel> = [];

  public currentCompanyID: number = this.user.company[0].id;
  public showPrivateDirectories: boolean = false;

  constructor (private _directoryService: DirectoryService,
               private _userRepository: UserRepository,
               private _activateRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this._activateRoute.snapshot.params['company_id']) {
      this.currentCompanyID = parseInt(this._activateRoute.snapshot.params['company_id']);
    }
    this.getDirectories();
  }

  get directoriesList(): Array<DirectoryModel> {

    let arr: Array<DirectoryModel> = this._directoriesList;

    if (this.showPrivateDirectories) {
      if (this.user.type != 'manager' && this.user.type != 'pro_manager') {
        arr = arr.filter(x => x.is_private == true);
      } else {
        arr = arr.filter(x => x.is_private == true && x.employee.id == this.user.id);
      }
    } else {
      arr = arr.filter(x => x.is_private == false);
    }

    return arr;
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  public onChangeCompany(): void {
    this.getDirectories();
  }

  public getDirectories(): void {
    this._directoryService.getDirectories({
      'company_id': this.currentCompanyID
    }).subscribe(
      data => {
        this._directoriesList = DirectoryModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  public openAddDirectoryModal(): void {
    this.addDirectoryModal.showModal();
  }

  public afterAddDirectory(event: boolean) {
    if (event) {
      this.addDirectoryModal.hideModal();
      this.getDirectories();
    }
  }
}
