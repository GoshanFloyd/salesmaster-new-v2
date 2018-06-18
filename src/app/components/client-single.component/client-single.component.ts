import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ActivatedRoute} from '@angular/router';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';
import {DealsKanbanComponent} from '../deals-kanban.component/deals-kanban.component';
import {ClientsService} from '../../services/clients.service';
import {ActivityService} from '../../services/activity.service';
import {ActivityModel} from '../../models/activity.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ActivityAddComponent} from '../activity-add.component/activity-add.component';
import {UserRepository} from '../../repositories/user.repository';
import {ActivityEditComponent} from '../activity-edit.component/activity-edit.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './client-single.component.html',
  host: { class: 'grid-row' }
})

export class ClientSingleComponent implements AfterViewChecked {

  @ViewChild('dealComponent') private dealKanbanComponent: DealsKanbanComponent;

  @ViewChild('modalActivityAdd') private modalActivityAdd: ModalStandardComponent;
  @ViewChild('activityAddMainComponent') private addActivityComponent: ActivityAddComponent;

  private id: number = null;

  public clientActivities: Array<ActivityModel> = [];

  constructor (private _clientRepository: ClientsRepository,
               private _activateRoute: ActivatedRoute,
               private _activityService: ActivityService,
               private _userRepository: UserRepository,
               private _notificationService: NotificationService) {

    this._activateRoute.params.subscribe((data) => {
      this.initClient();
    });
  }

  ngAfterViewChecked() {
    this._clientRepository.current_client.subscribe(data => {
      if (data) {
        this.dealKanbanComponent.initKanban(data.id, data.company.id);
      }
    });
  }

  get clientID(): number {
    return this.id;
  }

  private initClient() {
    this.id = this._activateRoute.snapshot.params['id'];
    this._clientRepository.getClientSingle(this.id);
    this.getClientActivities(this.id);
  }

  private getClientActivities(id: number) {
    this._activityService.getActivities({
      'client_id': id,
      'deal_null': true
    }).subscribe(
      data => {
        this.clientActivities = ActivityModel.fromArray(data)
          .sort((n1: ActivityModel, n2: ActivityModel) => n2.datetime_created.getTime() - n1.datetime_created.getTime());
        },
      err => console.log(err)
    );
  }

  get client(): Observable<ClientModel> {
    return this._clientRepository.current_client;
  }

  public onCreateActivity(value: boolean|number) {

    if (typeof value == 'number'){
      this.modalActivityAdd.percentLoad = value;
    }

    if (typeof value == 'boolean') {
      this.modalActivityAdd.percentLoad = 0;
      this.modalActivityAdd.hideModal();
      this.getClientActivities(this.id);
    }
  }

  public onEditActivity(value: boolean) {
    if (value) {
      this.getClientActivities(this.id);
    }
  }

  public onTransitActivity(value: any) {
    if (value) {
      this.getClientActivities(this.id);
      this._notificationService.sendNotification( {
        title: 'Активность перенесена'
      });
    }
  }

  public showAddModal() {
    this.addActivityComponent.init(this.id);
    this.modalActivityAdd.showModal();
  }

  public getTypePhone(type: string){
    return ClientModel.getTypePhone(type);
  }

  public getTypeMail(type: string){
    return ClientModel.getTypeMail(type);
  }
}
