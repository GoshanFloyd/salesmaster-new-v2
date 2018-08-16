import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CentrifugeService} from '../../services/centrifuge.service';
import {UserRepository} from '../../repositories/user.repository';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})

export class LoginComponent implements OnInit{

  @ViewChild('forgotPasswordModal') private _forgotPasswordModal: ModalStandardComponent;

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

  public openForgotPasswordModal(event: Event) {
    this._forgotPasswordModal.showModal();
  }
}
