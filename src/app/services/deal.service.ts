import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealModel} from '../models/deal.model';

@Injectable()
export class DealService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  private header = new HttpHeaders({
    'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  });

  constructor (private _httpClient: HttpClient) {}

  public getDeal(id: number): Observable<DealModel> {
    return this._httpClient.get<DealModel>(`${this.baseProtocol}${this.baseURL}deals/${id}`, {
      headers: this.header
    });
  }

  public getDeals(obj?: any): Observable<DealModel[]> {
    return this._httpClient.get<DealModel[]>(`${this.baseProtocol}${this.baseURL}deals`, {
      params: obj ? obj : null,
      headers: this.header
    });
  }

  public createDeal(obj?: any) {
    return this._httpClient.post(`${this.baseProtocol}${this.baseURL}deals`, obj, {
      headers: this.header
    })
  }

  public updateDeal(obj?: any) {
    return this._httpClient.patch(`${this.baseProtocol}${this.baseURL}deals/${obj.id}`, obj, {
      headers: this.header
    })
  }
}
