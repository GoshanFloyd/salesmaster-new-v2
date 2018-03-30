import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {UserRepository} from '../repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient,
              private _userRepository: UserRepository) { }

  public auth_token: string = localStorage.getItem('auth_token_salesmaster') || null;
  public isVerify = false;

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/';

  public authenticationUser (username: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseProtocol}${this.baseURL}auth/`, {
      'username': username,
      'password': password
    }).map((result) => {
      const r: any = result;
      if (r.token) {
        this.auth_token = r.token;
        localStorage.setItem('auth_token_salesmaster', this.auth_token);
        this.isVerify = true;
        return true;
      }
      this.auth_token = null;
      return false;
    });
  }

  public verifyToken(token: string = this.auth_token): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseProtocol}${this.baseURL}verify/`, {
      token: token
    }).map((result) => {
      if (result.token) {
        localStorage.setItem('auth_token_salesmaster', result.token);
        this.isVerify = true;
        return true;
      } else {
        this.clearToken();
        return false;
      }
    });
  }

  public clearToken() {
    this.auth_token = null;
    this.isVerify = false;
    localStorage.removeItem('auth_token_salesmaster');
  }
}
