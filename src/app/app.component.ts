import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {CentrifugeService} from './services/centrifuge.service';
import {LoadingService} from './services/loading.service';
import {HelperUrlService} from './services/helper.url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  public _isVisible: boolean;

  constructor (private _authService: AuthService,
               private _router: Router,
               private _loadingService: LoadingService,
               private _helperUrlService: HelperUrlService) {
  }

  ngOnInit( ) {

    // this._router.events.subscribe(
    //   data => {
    //     if (data instanceof NavigationEnd){
    //       console.log(data);
    //     }
    //   }
    // );

    // this._helperUrlService.requestGet('clients',{
    //   company_id: 31
    // }).subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   err => console.log(err)
    // )

    this._router.navigate(['/'], { queryParams: { pathname: window.location.pathname }});
  }
}
