import { Component } from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {ClientsRepository} from '../../repositories/clients.repository';
import {UserModel} from '../../models/user.model';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html'
})

export class ClientsListComponent {
  constructor (public _userRepository: UserRepository,
               public _clientsRepository: ClientsRepository) {
    this._clientsRepository.getContacts({
      company_id: this.user.company[0].id
    });
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get clients(): Observable<ClientModel[]> {
    return this._clientsRepository.clients__main;
  }

  public changeCompany(event: any) {
    this._clientsRepository.getContacts({
      company_title: event.target.value
    });
  }
}
