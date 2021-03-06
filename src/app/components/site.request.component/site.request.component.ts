import {Component, HostBinding, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs';
import {ColdClientService} from '../../services/cold.client.service';
import {ColdClientModel} from '../../models/cold.client.model';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './site.request.component.html',
  selector: 'app-site-request-component'
})

export class SiteRequestComponent implements OnInit {

  public currentCompany: number;
  public filterType: string = 'all';
  public currentColdClient: ColdClientModel = null;

  private _coldClients: Array<ColdClientModel> = [];

  @HostBinding('class') private class: string = 'grid-row';

  constructor(private _userRepository: UserRepository,
              private _coldClientService: ColdClientService,
              private _notificationService: NotificationService) {}

  ngOnInit() {
    this.currentCompany = this.user.getDefaultCompany().id;
    this.getColdClients({
      company_id: this.currentCompany
    }).subscribe();
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get coldClients(): Array<ColdClientModel> {

    if (this.filterType == 'all') {
      return this._coldClients;
    }

    if (this.filterType == 'my') {
      return this._coldClients.filter(x => x.employee != null && x.employee.id == this.user.id);
    }

    return this._coldClients;
  }

  public changeCompany(event: Event) {
    event.preventDefault();
    this.getColdClients({
      company_id: this.currentCompany
    }).subscribe();
  }

  public getColdClients(obj: any) {
    return Observable.create(observer => {
      this._coldClientService.searchColdClients(obj).subscribe(
        data => {
          this._coldClients = ColdClientModel.fromArray(data);
          observer.next(this._coldClients);
        },
        err => {
          console.log(err);
          observer.error(err);
        },
        () => {
          observer.complete();
        });
    });
  }

  public setCurrentColdClient(c: ColdClientModel) {
    if (!c.employee || c.employee.id == this.user.id) {
      this.currentColdClient = c;
    } else {
      this._notificationService.sendNotification({
        title: 'Данна заявка уже обрабатывается другим пользователем.'
      })
    };
  }

  public refreshColdClient(event: boolean) {
    if (event) {
      this.getColdClients({
        company_id: this.currentCompany
      }).subscribe();
    }
  }

  public refreshColdClientAfterConnect(event: boolean) {
    if (event) {
      this.currentColdClient = null;
      this.getColdClients({
        company_id: this.currentCompany
      }).subscribe();
    }
  }
}
