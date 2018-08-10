import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {ActivityModel} from '../models/activity.model';
import { Subject } from 'rxjs/Subject';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class ActivityService {

  constructor (private _httpClient: HttpClient) {}

  public getActivities(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ActivityModel[]>(`${UrlSettings.getBackendUrl()}activities`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public createActivity(obj?: any) {

    let subject = new Subject<any>();

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    const req = new HttpRequest('POST', `${UrlSettings.getBackendUrl()}activities`, obj, {
      headers: header,
      reportProgress: true
    });

    this._httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        subject.next(percentDone);
      } else if (event instanceof HttpResponse) {
        subject.complete();
      }
    });
    return subject.asObservable();
  }

  public updateActivity(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}activities/${id}`, obj, {
      headers: header
    });
  }
}
