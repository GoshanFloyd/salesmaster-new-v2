import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRepository} from '../../repositories/user.repository';
import {CentrifugeService} from '../../services/centrifuge.service';
import {ClientsRepository} from '../../repositories/clients.repository';

@Component({
  moduleId: module.id,
  selector: 'app-wait',
  templateUrl: './wait.component.html'
})

export class WaitComponent implements OnInit {

  private _mainURL: string = '/contacts/main';

  constructor(private _authService: AuthService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _userRepository: UserRepository,
              private _centrifugeService: CentrifugeService,
              private _clientsRepository: ClientsRepository) { }

  ngOnInit() {
    this._activeRoute.queryParams
      .subscribe(params => {
        const currentURL: string = params.pathname != '/' && params.pathname ? params.pathname : this._mainURL;
        if (this._authService.isVerify) {
          if (this._userRepository.user) {
            this._router.navigateByUrl(currentURL);
            this._clientsRepository.getContactsLight({
              company_id: this._userRepository.user.company[0].id
            });
            this._centrifugeService.init();
          } else {
            this._userRepository.initMyUser().subscribe(
              res => {
                this._router.navigateByUrl(currentURL);
                this._clientsRepository.getContactsLight({
                  company_id: this._userRepository.user.company[0].id
                });
                this._centrifugeService.init();
              },
              err => {
                this._router.navigateByUrl('/login');
              }
            );
          }
        } else {
          if (this._authService.auth_token) {
            this._authService.verifyToken().subscribe(data => {
                if (!data) {
                  this._router.navigateByUrl('/login');
                } else {
                  this._userRepository.initMyUser().subscribe(
                    res => {
                      this._router.navigateByUrl(currentURL);
                      this._clientsRepository.getContactsLight({
                        company_id: this._userRepository.user.company[0].id
                      });
                      this._centrifugeService.init();
                    },
                    err => {
                      this._router.navigateByUrl('/login');
                    }
                  );
                }
              },
              err => {
                this._router.navigateByUrl('/login');
              });
          } else {
            this._router.navigateByUrl('/login');
          }
        }
      });
  }
}
