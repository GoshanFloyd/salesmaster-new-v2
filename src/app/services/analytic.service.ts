import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AnalyticService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor(private _httpClient: HttpClient) {}

  public getAnalytic(obj?: any) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<any>(`${this.baseProtocol}${this.baseURL}analytics`, {
      headers: header,
      params: obj ? obj : null,
    });
  }
}
