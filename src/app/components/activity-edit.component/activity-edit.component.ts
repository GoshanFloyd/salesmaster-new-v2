import {Component, EventEmitter, Output} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {ActivityTypeService} from '../../services/activitytype.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivityTypeModel} from '../../models/acitivitytype.model';
import {NotificationService} from '../../services/notification.service';
import {ClientModel} from '../../models/client.model';
import {ClientsService} from '../../services/clients.service';
import {ActivityModel} from '../../models/activity.model';

@Component({
  moduleId: module.id,
  templateUrl: './activity-edit.component.html',
  selector: 'app-edit-activity'
})

export class ActivityEditComponent {

  @Output() onUpdate = new EventEmitter<boolean>()

  public activitiesTypes: ActivityTypeModel[] = [];

  private _client: ClientModel;
  private _activity: ActivityModel;

  public _formEditActivity = new FormGroup({
    type_title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  constructor (private _activityService: ActivityService,
               private _activityTypeService: ActivityTypeService,
               private _notificationService: NotificationService,
               private _clientService: ClientsService,
               private _activitiesTypesService: ActivityTypeService) {}

  public init(activity: ActivityModel, client_id: number ){
    this._clientService.getClientById(client_id).subscribe(
      data => {
        this._client = new ClientModel(data);
        this._activity = activity;
        this._formEditActivity.controls['type_title'].setValue(activity.type_title);
        this._formEditActivity.controls['description'].setValue(activity.description);
        this.getActivityTypes(this._client.company.id);
      }
    )
  }

  private getActivityTypes(company_id: number) {
    this._activitiesTypesService.getActivitiesTypes({
      'company_id': company_id
    }).subscribe(
      data => {
        this.activitiesTypes = ActivityTypeModel.getTypesArray(data);
      }
    )
  }

  public editActivity(event: Event) {

    event.preventDefault();

    const editActivity = {
      'employee': this._activity.employee.id,
      'client': this._activity.client.id,
      'deal_id': this._activity.deal ? this._activity.deal.id : null,
      'description': this._formEditActivity.controls['description'].value,
      'type_title': this._formEditActivity.controls['type_title'].value
    };

    this._activityService.updateActivity(this._activity.id, editActivity).subscribe(
      data => {
        this._activity = null;
        this._formEditActivity.controls['description'].setValue(null);
        this._formEditActivity.controls['type_title'].setValue(null);
        this.onUpdate.emit(true);
        this._notificationService.sendNotification({
          title: 'Активность обновлена'
        });
      },
      err => console.log(err)
    )
  }
}
