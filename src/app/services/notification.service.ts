import {Injectable} from '@angular/core';

declare const Notification: any;

@Injectable()
export class NotificationService {
  constructor () {
    this.checkPermission();
  }

  private checkPermission(): void {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  public sendNotification(title: string, body?: string, tag?: string, icon?: string) {
    const notification = new Notification(title, {
      body: body,
      tag: tag,
      icon: icon
    })
  }
}
