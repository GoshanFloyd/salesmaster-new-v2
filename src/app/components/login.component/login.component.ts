import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CentrifugeService} from '../../services/centrifuge.service';
import {UserRepository} from '../../repositories/user.repository';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{

  constructor (private _authService: AuthService,
               private _router: Router,
               private _centrifuge: CentrifugeService,
               private _userRepository: UserRepository) {}

  public loginInfo = {
    username: '',
    password: ''
  };

  ngOnInit() {
    this._authService.clearToken();
    this._userRepository.user = null;
    this._centrifuge.disconnectCentrifuge();
  }

  public loginUser() {
    this._authService.authenticationUser(this.loginInfo.username, this.loginInfo.password).subscribe(data => {
      if (data) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
