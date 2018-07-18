import {Injectable} from '@angular/core';
import {SoundService} from './sound.service';

declare const Notification: any;

interface ISendNotification {
  title: string,
  click?: {
    clickParameter?: any,
    onClickAction?: (obj: any) => any,
  }
  options?: {
    body?: string;
    tag?: string;
    icon?: string;
  }
}

@Injectable()
export class NotificationService {

  constructor (private _soundService: SoundService) {
    this._soundService.setSound();
    this.checkPermission();
  }

  private checkPermission(): void {
    if (Notification.permission != 'granted') {
      Notification.requestPermission();
    }
  }

  public sendNotification (data: ISendNotification) {

    this._soundService.playSound();
    this.checkPermission();

    let optionsNotifications = {};

    optionsNotifications['body'] = data.options && data.options.body ? data.options.body : '';
    optionsNotifications['tag'] = data.options && data.options.body ? data.options.tag : '';
    optionsNotifications['icon'] = data.options && data.options.body ? data.options.icon : '../../../assets/icons/192x192.png';

    let notification = new Notification(data.title, optionsNotifications);

    if (data.click && data.click.onClickAction && data.click.clickParameter) {
      notification.onclick = (event) => {
        notification.close();
        data.click.onClickAction(data.click.clickParameter);
      };
    }
  }
}
