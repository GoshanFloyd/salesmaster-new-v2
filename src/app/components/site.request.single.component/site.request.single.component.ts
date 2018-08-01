import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ColdClientService} from '../../services/cold.client.service';
import {ColdClientModel} from '../../models/cold.client.model';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './site.request.single.component.html',
  selector: 'app-site-request-single'
})

export class SiteRequestSingleComponent {
  @Input('currentColdClient') set currentColdClient(c: ColdClientModel) {
    if (c) {
      this._currentColdClient = c;
      console.log(this.currentColdClient);
      if (!this._currentColdClient.was_processed && !this._currentColdClient.employee) {
        this.setMyColdClient();
      }
    }
  }

  @Output('onSetMyClient') public setMyClient = new EventEmitter<boolean>();

  private _currentColdClient: ColdClientModel = null;

  constructor (private _coldClientService: ColdClientService,
               private _userRepository: UserRepository) {}

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get currentColdClient(): ColdClientModel {
    return this._currentColdClient;
  }

  private setMyColdClient() {
    this._coldClientService.updateColdClient(this._currentColdClient.id, {
      'employee': this.user.id,
      'was_processed': true
    }).subscribe(
      data => {
        this._currentColdClient = new ColdClientModel(data);
        this.setMyClient.emit(true);
      },
      err => console.log(err)
    );
  }
}

