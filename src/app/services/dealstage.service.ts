import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DealStageModel} from '../models/dealstage.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DealStageService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  getStages(obj: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DealStageModel[]>(`${this.baseProtocol}${this.baseURL}deal_stages`, {
      headers: header,
      params: obj ? obj : null,
    });
  }
}
