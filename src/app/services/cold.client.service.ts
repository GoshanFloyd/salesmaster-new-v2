import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ColdClientModel} from '../models/cold.client.model';

@Injectable()
export class ColdClientService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) { }

  // public createClient(obj: any) {
  //
  //   const header = new HttpHeaders({
  //     'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  //   });
  //
  //   return this._httpClient.post<ClientModel>(`${this.baseProtocol}${this.baseURL}clients`,  obj, {headers: header},
  //   );
  // }

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
