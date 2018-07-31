import {Component, Input} from '@angular/core';
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
      if (!this._currentColdClient.was_processed && !this._currentColdClient.employee) {
        this.setMyColdClient();
      }
    }
  }

  private _currentColdClient: ColdClientModel = null;

  constructor (private _coldClientService: ColdClientService,
               private _userRepository: UserRepository) {}

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  private setMyColdClient() {
    this._coldClientService.updateColdClient(this._currentColdClient.id, {
      'employee': this.user.id,
      'was_processed': true
    }).subscribe(
      data => {
        console.log(data);
        this._currentColdClient = new ColdClientModel(data);
      },
      err => console.log(err)
    );
  }
}

