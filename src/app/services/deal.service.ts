import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DealModel} from '../models/deal.model';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class DealService {

  private header = new HttpHeaders({
    'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  });

  constructor (private _httpClient: HttpClient) {}

  public getDeal(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DealModel>(`${UrlSettings.getBackendUrl()}deals/${id}`, {
      headers: header
    });
  }

  public getDeals(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DealModel[]>(`${UrlSettings.getBackendUrl()}deals`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public createDeal(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post(`${UrlSettings.getBackendUrl()}deals`, obj, {
      headers: header
    });
  }

  public updateDeal(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch(`${UrlSettings.getBackendUrl()}deals/${obj.id}`, obj, {
      headers: header
    });
  }
}
