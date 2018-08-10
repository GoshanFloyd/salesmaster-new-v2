import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class AnalyticService {

  constructor(private _httpClient: HttpClient) {}

  public getAnalytic(obj?: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<any>(`${UrlSettings.getBackendUrl()}analytics`, {
      headers: header,
      params: obj ? obj : null,
    });
  }
}
