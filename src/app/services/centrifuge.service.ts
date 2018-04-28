import {Injectable} from '@angular/core';
import {UserRepository} from '../repositories/user.repository';
import {NotificationService} from './notification.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DealModel} from '../models/deal.model';

declare let Centrifuge: any;

@Injectable()
export class CentrifugeService {

  private _centrifuge: any;

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _userRepository: UserRepository,
               private _notificationService: NotificationService,
               private _httpClient: HttpClient) {}

  private user() {
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
        console.log(data);
        this.initToken(data);
      },
      err => console.log(err)
    );
  }

  private initToken(data: any) {
    var centrifuge = new Centrifuge({
      url: 'https://test.salesmaster.me/centrifugo/connection/',
      project: '(n*#zi*mo(8&txw(&ahz^2huusv86j8+mofha*+jt%88(ud=0d',
      user: this._userRepository.getMyUser().id.toString(),
      timestamp: data.timestamp.toString(),
      token: data.token
    });


    var public_callbacks = {
      "message": function(dataset) {
        console.log('DATASET: '+JSON.stringify(dataset));
      },
      "join": function(message) {
        console.log('JOIN: '+JSON.stringify(message));
      },
      "leave": function(message) {
        console.log('LEAVE: '+JSON.stringify(message));
      },
      "subscribe": function(context) {
        console.log('SUBSCRIBE: '+JSON.stringify(context));
      },
      "error": function(errContext) {
        console.log('ERROR: '+JSON.stringify(errContext));
      },
      "unsubscribe": function(context) {
        console.log('UNSUBSCRIBE: '+JSON.stringify(context));
      }
    }

    var subscription = centrifuge.subscribe("task:expiring_task:$"+this._userRepository.getMyUser().id.toString(), public_callbacks);

    centrifuge.connect();
  }
}
