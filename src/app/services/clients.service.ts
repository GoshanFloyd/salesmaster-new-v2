import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ClientModel} from '../models/client.model';

@Injectable()
export class ClientsService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) { }

  public createClient(obj: any): Observable<ClientModel> {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ClientModel>(`${this.baseProtocol}${this.baseURL}clients`, {
      params: obj,
      headers: headers
    });
  }

  public getContacts(obj?: any): Observable<ClientModel[]> {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel[]>(`${this.baseProtocol}${this.baseURL}clients`,{
      params: obj ? obj : null,
      headers: headers
    });
  }

  public getClientById(id: number): Observable<ClientModel> {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel>(`${this.baseProtocol}${this.baseURL}clients/${id}`,{
      headers: headers
    });
  }
}
