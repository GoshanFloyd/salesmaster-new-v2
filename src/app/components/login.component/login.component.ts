import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {CentrifugeService} from '../../services/centrifuge.service';
import {UserRepository} from '../../repositories/user.repository';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ForgotPasswordService} from '../../services/forgot-password.service';
import {NotificationService} from '../../services/notification.service';
import {Subject} from 'rxjs';

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
               private _userRepository: UserRepository,
               private _forgotPasswordService: ForgotPasswordService,
               private _notificationService: NotificationService) {}

  public loginInfo = {
    username: '',
    password: ''
  };

  public timerRequestSubject = new Subject<number>();
  public timerRequestData = 60;
  public timerRequestDisable = false;
  public timeOut = null;

  public usernameForgotPassword: string = null;
  public codeResetForgotPassword: string = null;

  ngOnInit() {
    this.codeResetForgotPassword = '';
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

  public startTimer() {
    const self = this;
    self.timerRequestDisable = true;
    self.timerRequestSubject.next(self.timerRequestData);
    this.timeOut = setInterval(function () {
      self.timerRequestData -= 1;
      if (self.timerRequestData < 0) {
        self.timerRequestDisable = false;
        self.timerRequestData = 60;
        self.clearIntervalTimeOut();
      } else {
        self.timerRequestSubject.next(self.timerRequestData);
      }
    }, 1000);
  }

  public clearIntervalTimeOut() {
    clearInterval(this.timeOut);
  }

  public getCode(event: Event) {

    event.preventDefault();

    this._forgotPasswordService.authAndGetCode(this.usernameForgotPassword).subscribe(
      data => {
        if (data.success && data.success === `Code was successfully sent to the following E-Mail: ${this.usernameForgotPassword}`) {
          this._notificationService.sendNotification({
            title: 'Код подтверждения отправлен на указанную почту'
          });
          this.startTimer();
        }
      },
      err => {
        if ( err.error && err.error === `Employee (username=${this.usernameForgotPassword}) does not exist`) {
          this._notificationService.sendNotification({
            title: 'Данный пользователь не найден в базе'
          });
        }
      }
    );
  }

  public resetPassword(event: Event) {
    event.preventDefault();

    this._forgotPasswordService.resetPassword(this.usernameForgotPassword, this.codeResetForgotPassword).subscribe(
      data => {
        if (data.success && data.success === `Code was successfully sent to the following E-Mail: ${this.usernameForgotPassword}`) {
          this._notificationService.sendNotification({
            title: 'Пароль успешно сброшен. Проверьте почту'
          });
          this.usernameForgotPassword = '';
          this.codeResetForgotPassword = '';
          this._forgotPasswordModal.hideModal();
        }
      },
      err => {
        if (err.error && err.error === 'Reset codes do not match') {
          this._notificationService.sendNotification({
            title: 'Введен неверный код подтверждения'
          });
        }
      }
    );
  }
}
