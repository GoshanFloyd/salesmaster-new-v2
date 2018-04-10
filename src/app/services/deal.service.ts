import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealModel} from '../models/deal.model';

@Injectable()
export class DealService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getDeals(obj?: any): Observable<DealModel[]> {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DealModel[]>(`${this.baseProtocol}${this.baseURL}deals`, {
      params: obj ? obj : null,
      headers: headers
    });
  }

  public createDeal(obj?: any) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post(`${this.baseProtocol}${this.baseURL}deals`, obj, {
      headers: headers
    })
  }

  public updateDeal(obj?: any) {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch(`${this.baseProtocol}${this.baseURL}deals/${obj.id}`, obj, {
      headers: headers
    })
  }
}
