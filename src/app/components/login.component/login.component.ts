import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{

  constructor (private _authService: AuthService,
               private _router: Router) {}

  public loginInfo = {
    username: '',
    password: ''
  };

  ngOnInit() {
    console.log('Clear info');
    this._authService.clearToken();
  }

  public loginUser() {
    console.log(this.loginInfo.username, this.loginInfo.password);
    this._authService.authenticationUser(this.loginInfo.username, this.loginInfo.password).subscribe(data => {
      if (data) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
