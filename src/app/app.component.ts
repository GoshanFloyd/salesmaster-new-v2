import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {CentrifugeService} from './services/centrifuge.service';
import {LoadingService} from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  public _isVisible: boolean;

  constructor (private _authService: AuthService,
               private _router: Router,
               private _loadingService: LoadingService) {
    this._loadingService.isVisible.subscribe(
      data => {
        this._isVisible = data;
      }
    );
  }

  ngOnInit( ) {

    this._router.events.subscribe(
      data => {
        if (data instanceof NavigationEnd){
          // console.log(data.url);
        }
      }
    );

    this._router.navigateByUrl('/');
  }
}
