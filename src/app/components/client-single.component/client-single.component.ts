import {Component} from '@angular/core';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ActivatedRoute} from '@angular/router';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  templateUrl: './client-single.component.html',
  host: { class: 'grid-row' }
})

export class ClientSingleComponent {

  private id: number = null;

  constructor (private _clientRepository: ClientsRepository,
               private _activateRoute: ActivatedRoute) {
    this._activateRoute.params.subscribe((data) => {
      this.initClient();
    });
  }

  private initClient() {
    this.id = this._activateRoute.snapshot.params['id'];
    this._clientRepository.getClientSingle(this.id);
  }

  get client(): Observable<ClientModel> {
    return this._clientRepository.current_client;
  }
}
