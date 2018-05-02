import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ClientModel} from '../models/client.model';
import {ClientLightModel} from '../models/client.light.model.';

@Injectable()
export class ClientsService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) { }

  public createClient(obj: any): Observable<ClientModel> {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ClientModel>(`${this.baseProtocol}${this.baseURL}clients`,  obj, {headers: header},
    );
  }

  public getContacts(obj?: any): Observable<ClientModel[]> {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel[]>(`${this.baseProtocol}${this.baseURL}clients`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getClientById(id: number): Observable<ClientModel> {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientModel>(`${this.baseProtocol}${this.baseURL}clients/${id}`, {
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
      }
    }

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientLightModel>(`${this.baseProtocol}${this.baseURL}clients`, {
      headers: header,
      params: obj ? obj : lightweight
    });
  }


  public getClientLightWeightById(id: number): Observable<ClientLightModel> {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ClientLightModel>(`${this.baseProtocol}${this.baseURL}clients/${id}?lightweight=True`, {
      headers: header,
    });
  }

  public updateClient(id:number, obj: any): Observable<any> {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}clients/${id}`, obj, {
      headers: header
    })
  }
}
