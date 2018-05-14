import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DocumentModel} from '../models/document.model';

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

  public createDocument(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<DocumentModel>(`${this.baseProtocol}${this.baseURL}documents`, obj, {
      headers: header
    });
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
