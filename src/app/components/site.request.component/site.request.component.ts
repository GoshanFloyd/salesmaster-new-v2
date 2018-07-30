import {Component, HostBinding, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs';
import {ColdClientService} from '../../services/cold.client.service';
import {ColdClientModel} from '../../models/cold.client.model';

@Component({
  moduleId: module.id,
  templateUrl: './site.request.component.html',
  selector: 'app-site-request-component'
})

export class SiteRequestComponent implements OnInit {

  public currentCompany: number;

  private _coldClients: Array<ColdClientModel> = [];

  @HostBinding('class') private class: string = 'grid-row';

  constructor(private _userRepository: UserRepository,
              private _coldClientService: ColdClientService) {}

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
}
