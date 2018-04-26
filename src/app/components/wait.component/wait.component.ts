import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRepository} from '../../repositories/user.repository';

@Component({
  moduleId: module.id,
  selector: 'app-wait',
  templateUrl: './wait.component.html'
})

export class WaitComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router,
              private _userRepository: UserRepository) { }

  ngOnInit() {

    if (this._authService.isVerify) {
      if (this._userRepository.user) {
        this._router.navigateByUrl('/contacts/main');
      } else {
        this._userRepository.initMyUser().subscribe(
          res => {
            this._router.navigateByUrl('/contacts/main');
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
                this._router.navigateByUrl('/contacts/main');
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
  }
}
