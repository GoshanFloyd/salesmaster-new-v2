import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {IEmployeeInfo} from '../components/employee.info.component/employee.info.component';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

  public getMyUser(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.get<UserModel>(`${UrlSettings.getBackendUrl()}employees/${id}`, {
      headers: headers
    });
  }

  public getUsers(obj?: any) {

    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.get<UserModel[]>(`${UrlSettings.getBackendUrl()}employees`, {
      headers: headers,
      params: obj ? obj : null
    });
  }

  public updateUser(id: number, obj: any) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.patch<UserModel[]>(`${UrlSettings.getBackendUrl()}employees/${id}`, obj, {
      headers: headers,
    });
  }

  public getUserInfo(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this.httpClient.get<Array<IEmployeeInfo>>(`${UrlSettings.getBackendUrl()}employees?id=${id}&for_profile=true`, {
      headers: headers
    });
  }
}
