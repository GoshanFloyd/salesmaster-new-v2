import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DirectoryModel} from '../models/directory.model';

@Injectable()
export class DirectoryService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getDirectories(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DirectoryModel[]>(`${this.baseProtocol}${this.baseURL}directories`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getDirectory(directory_id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<DirectoryModel>(`${this.baseProtocol}${this.baseURL}directories/${directory_id}`, {
      headers: header
    });
  }

  public createDirectory(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<DirectoryModel>(`${this.baseProtocol}${this.baseURL}directories`, obj, {
      headers: header
    });
  }

  public updateDirectory(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}directories/${id}`, obj, {
      headers: header
    });
  }
}
