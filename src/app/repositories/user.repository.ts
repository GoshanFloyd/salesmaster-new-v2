import { Injectable } from '@angular/core';
import {UserService} from '../services/user.service';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserRepository {
  constructor (private _userService: UserService) { }

  public user: UserModel = null;

  initMyUser(){
    return Observable.create(observer => {
      this._userService.getMyUser(UserModel.parseJwt(localStorage.getItem('auth_token_salesmaster')).user_id).subscribe(
        data => {
          this.user = new UserModel(data);
          observer.next(this.user);
          observer.complete();
        },
        err => {
          observer.error();
        }
      )
    });
  }

  public getMyUser(): UserModel{
    return this.user;
  }
}
