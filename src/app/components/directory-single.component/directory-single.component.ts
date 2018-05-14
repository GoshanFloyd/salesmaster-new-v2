import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../../services/document.service';
import {UserModel} from '../../models/user.model';
import {UserRepository} from '../../repositories/user.repository';
import {ActivatedRoute} from '@angular/router';
import {DocumentModel} from '../../models/document.model';

@Component({
  moduleId: module.id,
  selector: 'app-directory-single',
  templateUrl: "./directory-single.component.html",
  host: {class: 'grid-row'}
})

export class DirectorySingleComponent implements OnInit {

  private _currentDirectoryID: number;

  private _documentsList: Array<DocumentModel> = [];

  constructor (private _documentService: DocumentService,
               private _userRepository: UserRepository,
               private _activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this._currentDirectoryID = this._activateRoute.snapshot.params['id'];
    this.getDocuments();
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get documentsList(): Array<DocumentModel> {
    let arr: Array<DocumentModel> = this._documentsList;

    return arr;
  }

  public getDocuments(): void {
    this._documentService.getDocuments({
      'directory_id': this._currentDirectoryID
    }).subscribe(
      data => {
        this._documentsList = DocumentModel.fromArray(data);
      },
      err => console.log(err)
    )
  }
}
