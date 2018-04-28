import { Injectable } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {ClientModel} from '../models/client.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class ClientsRepository {
  constructor(private _clientService: ClientsService,
              private _loadingService: LoadingService) { }

  private _clients_main: BehaviorSubject<Array<ClientModel>> = new BehaviorSubject([]);
  public clients__main: Observable<Array<ClientModel>> = this._clients_main.asObservable();

  private _current_client: BehaviorSubject<ClientModel> = new BehaviorSubject<ClientModel>(null);
  public current_client: Observable<ClientModel> = this._current_client.asObservable();

  public getContacts (obj?: any) {
    this._loadingService.showLoader();
    this._clientService.getContacts(obj).subscribe(
      data => {
        this._clients_main.next(ClientModel.getClientArray(data));
        this._loadingService.hideLoader();
        },
      err => {
        console.log(err);
      }
    );
  }

  public getClientSingle(id: number) {
    this._current_client.next(null);
    this._clientService.getClientById(id).subscribe(
      data => {
        this._current_client.next(new ClientModel(data));
      },
      err => console.log(err)
    );
  }

  public createClient(client: any) {
    return this._clientService.createClient(client);
  }
}
