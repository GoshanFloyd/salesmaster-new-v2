import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {NotificationService} from '../services/notification.service';


@Injectable()
export class AuthenticationProvider implements HttpInterceptor {

  constructor(private _router: Router,
              private _notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err);
        if (err.status === 400 && err.error.non_field_errors) {
          this._notificationService.sendNotification({
              title: 'Время сессии истекло',
              options: {
                body: 'Необходимо перезайти в CRM.'
              }
            },
          );
          this._router.navigate(['login']);
        }
        if (err.status === 401) {
          this._notificationService.sendNotification({
            title: 'Произошла ошибка',
            options: {
              body:  'Данные пользователя устарели. Пожалуйста, войдите в CRM заново.'
            }},
          );
          this._router.navigate(['login']);
        }
        if (err.status === 500) {
          this._notificationService.sendNotification({
            title: 'Произошла ошибка',
            options: {
              body:  'Ошибка на стороне сервера. Пожалуйста, свяжитесь с системным администратором.'
            }},
          );
        }
      }
    });
  }
}
