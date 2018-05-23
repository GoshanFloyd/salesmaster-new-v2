import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

export interface IUrlItem {
  url: string;
  method: string;
}

@Injectable()
export class HelperUrlService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _http: HttpClient) {}

  private _getTokenWithHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });
  }

  private getMainURL(): string {
    return `${this.baseProtocol}${this.baseURL}`;
  }

  public requestGet(url: string, params?: any) {
    const request = new HttpRequest('GET', this.getMainURL()+url, {
      headers: this._getTokenWithHeader(),
      params: params ? params : null
    })

    return this._http.request(request);
  }

  public requestPost() {

  }

  public requestPatch() {

  }

  public requestPut() {

  }

  public requestDelete() {

  }
}
