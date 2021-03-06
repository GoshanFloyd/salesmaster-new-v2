import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientModel, IClientHandbook} from '../models/client.model';
import {ClientLightModel} from '../models/client.light.model.';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()
export class ClientsService {

  constructor (private _httpClient: HttpClient) { }

  public createClient(obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ClientModel>(`${UrlSettings.getBackendUrl()}clients`,  obj, {headers: header},
    );
  }

  public getContacts(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel[]>(`${UrlSettings.getBackendUrl()}clients`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getClientById(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel>(`${UrlSettings.getBackendUrl()}clients/${id}`, {
      headers: header
    });
  }

  public getClientsLightWeight(obj?: any) {

    let lightweight = null;

    if (obj) {
      obj['lightweight'] = true;
    } else {
      lightweight = {
        'lightweight': true
      };
    }

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientLightModel>(`${UrlSettings.getBackendUrl()}clients`, {
      headers: header,
      params: obj ? obj : lightweight
    });
  }

  public getClientsHandbook(obj?: any) {

    let digest = null;

    if (obj) {
      obj['digest'] = true;
    } else {
      digest = {
        'digest': true
      };
    }

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<Array<IClientHandbook>>(`${UrlSettings.getBackendUrl()}clients`, {
      headers: header,
      params: obj ? obj : digest
    });
  }

  public getClientLightWeightById(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientLightModel>(`${UrlSettings.getBackendUrl()}clients/${id}?lightweight=True`, {
      headers: header,
    });
  }

  public updateClient(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}clients/${id}`, obj, {
      headers: header
    });
  }

  public deleteClient(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.delete<any>(`${UrlSettings.getBackendUrl()}clients/${id}`, {
      headers: header,
    });
  }
}
