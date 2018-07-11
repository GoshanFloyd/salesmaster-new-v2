import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {DocumentModel} from '../models/document.model';
import {Subject} from 'rxjs/Subject';
import { TPercentResponse} from '../interfaces/percent.interface';

@Injectable()
export class DocumentService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getDocuments(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DocumentModel[]>(`${this.baseProtocol}${this.baseURL}documents`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public createDocument(obj: FormData) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<DocumentModel>(`${this.baseProtocol}${this.baseURL}documents`, obj, {
      headers: header
    });
  }

  public uploadDocument(obj: FormData) {

    let subject = new Subject<any>();

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    const req = new HttpRequest('POST', `${this.baseProtocol}${this.baseURL}documents`, obj, {
      headers: header,
      reportProgress: true
    });

    this._httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        const response: TPercentResponse = {
          type: 'document_loading',
          data: percentDone
        }
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

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}documents/${id}`, obj, {
      headers: header
    });
  }
}
