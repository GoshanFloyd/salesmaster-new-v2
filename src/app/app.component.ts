import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {UserRepository} from './repositories/user.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor (private _authService: AuthService,
               private _router: Router,
               private _userRepository: UserRepository) {}

  ngOnInit() {
    this._router.navigateByUrl('/');
  }
}
