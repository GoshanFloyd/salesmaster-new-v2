import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {PercentRepsponse} from '../classes/percent.class';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()
export class ReportService {

  constructor (private _httpClient: HttpClient) {}

  getAnalyticsReport(obj: any, type: string = 'json'): Observable<any> {

    const subject = new Subject<any>();

    obj['subject'] = 'activity';

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    let params = new HttpParams({fromObject: obj});

    const req = new HttpRequest('GET', `${UrlSettings.getBackendUrl()}reports`, {
      headers: header,
      params: params,
      reportProgress: true,
      responseType: type === 'json' ? 'json' : 'blob'
    });

    this._httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        const response: PercentRepsponse = new PercentRepsponse('report_activity_loading', percentDone);
        subject.next(response);
      } else if (event instanceof HttpResponse) {
        subject.next(event.body);
        subject.complete();
      }
    });

    return subject.asObservable();
  }
}
