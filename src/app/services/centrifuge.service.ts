import {Injectable} from '@angular/core';
import {UserRepository} from '../repositories/user.repository';
import {NotificationService} from './notification.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../models/user.model';
import {Router} from '@angular/router';

declare let Centrifuge: any;

@Injectable()
export class CentrifugeService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  private centrifuge: any;

  constructor (private _userRepository: UserRepository,
               private _notificationService: NotificationService,
               private _httpClient: HttpClient,
               private _router: Router) {}

  private user(): UserModel {
    return this._userRepository.getMyUser();
  }

  public getToken(user_id: number) {
    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get(`${this.baseProtocol}${this.baseURL}websocket/${user_id}`, {
      headers: header
    });
  }

  public init(): void {
    this.getToken(this._userRepository.getMyUser().id).subscribe(
      data => {
        this.initToken(data);
      },
      err => console.log(err)
    );
  }

  private initToken(data: any) {
    this.centrifuge = new Centrifuge({
      url: 'https://test.salesmaster.me/centrifugo/connection/',
      project: '(n*#zi*mo(8&txw(&ahz^2huusv86j8+mofha*+jt%88(ud=0d',
      user: this._userRepository.getMyUser().id.toString(),
      timestamp: data.timestamp.toString(),
      token: data.token
    });

    this.centrifuge.subscribe('task:delayed_task:$' + this.user().id.toString(), this.getDelayingTasksCallbacks());
    this.centrifuge.subscribe('task:expiring_task:$' + this.user().id.toString(), this.getExpiringTasksCallbacks());
    this.centrifuge.subscribe('admin', this.adminChannel());

    this.centrifuge.connect();
  }

  private getExpiringTasksCallbacks() {
    const self = this;

    return {
      'message': function(dataset) {
        self._notificationService.sendNotification({
          title: 'Истекает срок задачи',
          options: {
            body: `${dataset.data.task_title} - ${new Date(dataset.data.datetime_deadline).toDateString()}`,
            icon: ''
          },
          click: {
            clickParameter: dataset.data,
            onClickAction: obj => {
              self._router.navigateByUrl('tasks/main/' + obj.task_id);
            }
          }
        });
      }
    };
  }

  private getDelayingTasksCallbacks() {

    const self = this;

    return {
      'message': function(dataset) {
        self._notificationService.sendNotification({
          title: 'Просроченная задача',
          options: {
            body: dataset.data.task_title
          },
          click: {
            clickParameter: dataset.data,
            onClickAction: obj => {
              self._router.navigateByUrl('tasks/main/' + obj.task_id);
            }
          }
        });
      }
    };
  }

  private adminChannel() {

    const self = this;

    return {
      'message': function (dataset) {
        self._notificationService.sendNotification({
          title: dataset.data.subject,
          options: {
            body: dataset.data.message
          }
        });
      }
    };
  }

  public disconnectCentrifuge(): void {
    if (this.centrifuge) {
      this.centrifuge.disconnect();
    }
  }
}
