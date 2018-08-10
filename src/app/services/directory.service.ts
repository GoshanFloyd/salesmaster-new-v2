import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DirectoryModel} from '../models/directory.model';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()
export class DirectoryService {

  constructor (private _httpClient: HttpClient) {}

  public getDirectories(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DirectoryModel[]>(`${UrlSettings.getBackendUrl()}directories`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getDirectory(directory_id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DirectoryModel>(`${UrlSettings.getBackendUrl()}directories/${directory_id}`, {
      headers: header
    });
  }

  public createDirectory(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<DirectoryModel>(`${UrlSettings.getBackendUrl()}directories`, obj, {
      headers: header
    });
  }

  public updateDirectory(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}directories/${id}`, obj, {
      headers: header
    });
  }
}
