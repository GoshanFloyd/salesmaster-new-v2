import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../models/user.model';
import {UserRepository} from '../../repositories/user.repository';
import {DirectoryService} from '../../services/directory.service';

@Component({
  moduleId: module.id,
  selector: 'app-directory-add',
  templateUrl: './directory-add.component.html'
})

export class DirectoryAddComponent {

  @Output() onAddDirectory = new EventEmitter<boolean>();

  public _formNewDirectory: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    is_private: new FormControl(false),
    company: new FormControl(this.user.company[0].title, Validators.required)
  });

  constructor (private _userRepository: UserRepository,
               private _directoryService: DirectoryService) {}

  public addDirectory(event: Event) {
    event.preventDefault();

    const newDirectory = {
      'company': this._formNewDirectory.controls['company'].value,
      'is_private': this._formNewDirectory.controls['is_private'].value,
      'title': this._formNewDirectory.controls['title'].value,
      'employee': this.user.id
    }

    this._directoryService.createDirectory(newDirectory).subscribe(
      data => {
        this.onAddDirectory.emit(true);
        this._formNewDirectory.reset();
      },
      err => this.onAddDirectory.emit(false)
    )
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }
}
