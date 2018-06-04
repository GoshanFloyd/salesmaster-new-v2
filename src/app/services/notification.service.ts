import {Injectable} from '@angular/core';

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

  public sound: any;

  constructor () {
    this.sound = new Audio('../../assets/sounds/notify.mp3');
    this.sound.volume = 0.2;
    this.checkPermission();
  }

  private checkPermission(): void {
    if (Notification.permission != 'granted') {
      Notification.requestPermission();
    }
  }

  public sendNotification (data: ISendNotification) {

    this.checkPermission();

    this.sound.play();

    let optionsNotifications = {};

    optionsNotifications['body'] = data.options && data.options.body ? data.options.body : '';
    optionsNotifications['tag'] = data.options && data.options.body ? data.options.tag : '';
    optionsNotifications['icon'] = data.options && data.options.body ? data.options.icon : '';

    let notification = new Notification(data.title, optionsNotifications);

    if (data.click && data.click.onClickAction && data.click.clickParameter) {
      notification.onclick = (event) => {
        notification.close();
        data.click.onClickAction(data.click.clickParameter);
      };
    }
  }
}
