import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColdClientService} from '../../services/cold.client.service';
import {ColdClientModel} from '../../models/cold.client.model';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {SiteConvertClientComponent} from '../site.convert-client.component/site.convert-client.component';

@Component({
  moduleId: module.id,
  templateUrl: './site.request.single.component.html',
  selector: 'app-site-request-single'
})

export class SiteRequestSingleComponent {

  @ViewChild('clientConvertComponent') private clientConvertComponent: SiteConvertClientComponent;

  @Input('currentColdClient') set currentColdClient(c: ColdClientModel) {
    if (c) {
      this._currentColdClient = c;
      if (!this._currentColdClient.was_processed && !this._currentColdClient.employee) {
        this.setMyColdClient();
      }
    }
  }

  @Output('onSetMyClient') public setMyClient = new EventEmitter<boolean>();
  @Output('onConvert') public onConvert = new EventEmitter<boolean>();

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

  public openConvertColdClient(event: Event) {
    event.preventDefault();

    this.clientConvertComponent.openModal();
  }


  public afterConvertColdClient(event: boolean) {
    if (event) {
      this.onConvert.emit(true);
    }
  }
}


