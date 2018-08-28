import { Injectable } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import {ClientModel, IClientHandbook} from '../models/client.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoadingService} from '../services/loading.service';
import {ClientLightModel} from '../models/client.light.model.';

@Injectable()
export class ClientsRepository {
  constructor(private _clientService: ClientsService,
              private _loadingService: LoadingService) { }

  private _clients_main: BehaviorSubject<Array<ClientModel>> = new BehaviorSubject([]);
  public clients__main = this._clients_main.asObservable();

  private _current_client: BehaviorSubject<ClientModel> = new BehaviorSubject<ClientModel>(null);
  public current_client = this._current_client.asObservable();

  private _clients_main_light: BehaviorSubject<Array<ClientLightModel>> = new BehaviorSubject([]);
  public clients_main_light = this._clients_main_light.asObservable();

  public currentSearchString: string = '';
  public currentCompanyID: number = null;
  public currentScrollID: number = 0;

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

  public getContactsLight(obj?: any) {
    this._loadingService.showLoader();
    this._clientService.getClientsLightWeight(obj).subscribe(
      data => {
        this._clients_main_light.next(ClientLightModel.getClientArray(data));
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
      err => {
        console.log(err);
      }
    );
  }

  public createClient(client: any) {
    return this._clientService.createClient(client);
  }

  public setCurrentCompanyID(id: number) {
    this.currentCompanyID = id;
  }

  public setCurrentSearchString(searchString: string) {
    this.currentSearchString = searchString;
  }

  public clearInfo() {
    this.currentCompanyID = null;
    this.currentSearchString = '';
  }
}
