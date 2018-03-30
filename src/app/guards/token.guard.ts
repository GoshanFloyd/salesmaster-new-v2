import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private router: Router,
              private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._authService.auth_token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
