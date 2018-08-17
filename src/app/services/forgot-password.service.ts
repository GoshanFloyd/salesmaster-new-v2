import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlSettings} from '../settings/urlSettings';
import 'rxjs-compat/add/operator/mergeMap';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private _usernameForgotPassword = 'controller@salesmaster.me';
  private _passwordForgotPassword = '7z)V7kD44]FUB}7p!S7&';


  constructor(private _http: HttpClient) { }

  public authAndGetCode(username: string) {
    return this._http.post<any>(`${UrlSettings.getAuthBackendUrl()}auth/`, {
      'username': this._usernameForgotPassword,
      'password': this._passwordForgotPassword
    }).mergeMap((result) => {

      const header = new HttpHeaders({
        'Authorization': `jwt ${result['token']}`
      });
      return this._http.post<any>(`${UrlSettings.getBackendUrl()}employees/reset_code`, {
        email: username
      }, {
        headers: header
      });
    });
  }

  public resetPassword(username: string, resetCode: string) {

    return this._http.post<any>(`${UrlSettings.getAuthBackendUrl()}auth/`, {
      'username': this._usernameForgotPassword,
      'password': this._passwordForgotPassword
    }).mergeMap((result) => {

      const header = new HttpHeaders({
        'Authorization': `jwt ${result['token']}`
      });

      return this._http.post<any>(`${UrlSettings.getBackendUrl()}employees/change_passwd`, {
        email: username,
        reset_code: resetCode
      }, {
        headers: header
      });
    });

  }
}
