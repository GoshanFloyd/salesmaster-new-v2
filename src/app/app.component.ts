import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {CentrifugeService} from './services/centrifuge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor (private _authService: AuthService,
               private _router: Router) {}

  ngOnInit( ) {
    this._router.navigateByUrl('/');
  }
}
