import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  constructor (private _authService: AuthService,
               private _router: Router,
               private _notificationService: NotificationService) {}

  ngOnInit( ) {
    this._router.navigateByUrl('/');
  }
}
