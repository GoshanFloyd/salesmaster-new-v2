import {Component, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {ClientsRepository} from '../../repositories/clients.repository';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './contacts.component.html'
})

export class ContactsComponent{


  constructor(public _userRepository: UserRepository,
              public _clientsRepository: ClientsRepository) { }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }
}
