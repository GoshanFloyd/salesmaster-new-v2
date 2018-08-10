import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ColdClientModel, IColdClientObjectCreate} from '../models/cold.client.model';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class ColdClientService {

  constructor (private _httpClient: HttpClient) { }

  public updateColdClient(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<IColdClientObjectCreate>(`${UrlSettings.getBackendUrl()}cold_clients/${id}`,  obj, {
      headers: header
    });
  }

  public convertColdClient(id: number, obj: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.put<any>(`${UrlSettings.getBackendUrl()}cold_clients/${id}`,  obj, {
      headers: header
    });
  }

  public searchColdClients(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ColdClientModel[]>(`${UrlSettings.getBackendUrl()}cold_clients`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getColdClient(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ColdClientModel[]>(`${UrlSettings.getBackendUrl()}cold_clients/${id}`, {
      headers: header
    });
  }

}
