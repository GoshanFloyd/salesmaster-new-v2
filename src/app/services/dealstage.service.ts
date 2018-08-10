import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DealStageModel} from '../models/dealstage.model';
import {Observable} from 'rxjs/Observable';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class DealStageService {

  constructor (private _httpClient: HttpClient) {}

  getStages(obj: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DealStageModel[]>(`${UrlSettings.getBackendUrl()}deal_stages`, {
      headers: header,
      params: obj ? obj : null,
    });
  }
}
