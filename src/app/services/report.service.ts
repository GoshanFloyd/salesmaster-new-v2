import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ResponseContentType, ResponseType} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReportService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  getAnalyticsReport(obj: any, type: string = 'json'): Observable<any>{

    obj['subject'] = 'activity';

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    if (type == 'json') {
      return this._httpClient.get<any>(`${this.baseProtocol}${this.baseURL}reports`, {
        params: obj ? obj : null,
        headers: header,
      })
    } else {
      return this._httpClient.get<any>(`${this.baseProtocol}${this.baseURL}reports`, {
        params: obj ? obj : null,
        headers: header,
        responseType: 'blob' as 'json',
        reportProgress: true
      })
    }
  }
}

//TODO Исправить баг на 31 строке. Идет несоответствие типов
