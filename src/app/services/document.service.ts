import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {DocumentModel} from '../models/document.model';
import {Subject} from 'rxjs/Subject';
import {PercentRepsponse} from '../classes/percent.class';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class DocumentService {

  constructor (private _httpClient: HttpClient) {}

  public getDocuments(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DocumentModel[]>(`${UrlSettings.getBackendUrl()}documents`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public createDocument(obj: FormData) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<DocumentModel>(`${UrlSettings.getBackendUrl()}documents`, obj, {
      headers: header
    });
  }

  public uploadDocument(obj: FormData) {

    let subject = new Subject<any>();

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    const req = new HttpRequest('POST', `${UrlSettings.getBackendUrl()}documents`, obj, {
      headers: header,
      reportProgress: true
    });

    this._httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        const response: PercentRepsponse = new PercentRepsponse('document_loading', percentDone);
        subject.next(response);
      } else if (event instanceof HttpResponse) {
        subject.next(event);
        subject.complete();
      }
    });

    return subject.asObservable();
  }

  public updateDocument(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}documents/${id}`, obj, {
      headers: header
    });
  }

  public deleteDocument(id: number) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.delete<any>(`${UrlSettings.getBackendUrl()}documents/${id}`, {
      headers: header
    });
  }
}
