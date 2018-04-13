import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ClientModel} from '../models/client.model';

@Injectable()
export class ClientsService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  private header = new HttpHeaders({
    'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  });

  constructor (private _httpClient: HttpClient) { }

  public createClient(obj: any): Observable<ClientModel> {
    return this._httpClient.post<ClientModel>(`${this.baseProtocol}${this.baseURL}clients`,  obj, {headers: this.header},
    );
  }

  public getContacts(obj?: any): Observable<ClientModel[]> {
    return this._httpClient.get<ClientModel[]>(`${this.baseProtocol}${this.baseURL}clients`, {
      params: obj ? obj : null,
      headers: this.header
    });
  }

  public getClientById(id: number): Observable<ClientModel> {
    return this._httpClient.get<ClientModel>(`${this.baseProtocol}${this.baseURL}clients/${id}`, {
      headers: this.header
    });
  }

  public updateClient(id:number, obj: any): Observable<any> {
    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}clients/${id}`, obj, {
      headers: this.header
    })
  }
}
