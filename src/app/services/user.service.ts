import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}
  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  public getMyUser(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.get<UserModel>(`${this.baseProtocol}${this.baseURL}employees/${id}`, {
      headers: headers
    });
  }

  public getUsers(obj?: any) {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.get<UserModel[]>(`${this.baseProtocol}${this.baseURL}employees`, {
      headers: headers,
      params: obj ? obj : null
    });
  }

  public updateUser(id: number, obj: any) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.patch<UserModel[]>(`${this.baseProtocol}${this.baseURL}employees/${id}`, obj, {
      headers: headers,
    });
  }
}
