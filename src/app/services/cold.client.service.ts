import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ColdClientModel, IColdClientObjectCreate} from '../models/cold.client.model';

@Injectable()
export class ColdClientService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) { }

  public updateColdClient(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<IColdClientObjectCreate>(`${this.baseProtocol}${this.baseURL}cold_clients/${id}`,  obj, {
      headers: header
    });
  }

  public convertColdClient(id: number, obj: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.put<any>(`${this.baseProtocol}${this.baseURL}cold_clients/${id}`,  obj, {
      headers: header
    });
  }

  public searchColdClients(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ColdClientModel[]>(`${this.baseProtocol}${this.baseURL}cold_clients`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getColdClient(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ColdClientModel[]>(`${this.baseProtocol}${this.baseURL}cold_clients/${id}`, {
      headers: header
    });
  }

}
