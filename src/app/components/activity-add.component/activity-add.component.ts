import {Component, EventEmitter, Output} from '@angular/core';
import {ActivityService} from '../../services/activity.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivityTypeModel} from '../../models/acitivitytype.model';
import {ActivityTypeService} from '../../services/activitytype.service';
import {ClientsService} from '../../services/clients.service';
import {UserRepository} from '../../repositories/user.repository';
import {ClientModel} from '../../models/client.model';
import {NotificationService} from '../../services/notification.service';

type metadataAddActivity = {
  client: number,
  employee: number,
  deal_id: number,
  company: number
}

@Component({
  moduleId: module.id,
  selector: 'app-activity-add',
  templateUrl: './activity-add.component.html'
})

export class ActivityAddComponent {

  @Output() onCreate = new EventEmitter<boolean|number>();

  public activitiesTypes: ActivityTypeModel[] = [];

  public disableAddButton: boolean = false;

  private _userID: number;
  private _dealID: number;
  private _client: ClientModel;

  private _formData: FormData = new FormData();

  public _formAddActivity = new FormGroup({
    type_title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  constructor (private _activityService: ActivityService,
               private _activitiesTypesService: ActivityTypeService,
               private _clientService: ClientsService,
               private _userRepository: UserRepository,
               private _notificationService: NotificationService) {
    this._userID = this._userRepository.getMyUser().id;
  }

  private getActivityTypes(company_id: number) {
    this._activitiesTypesService.getActivitiesTypes({
      'company_id': company_id
    }).subscribe(
      data => {
        this.activitiesTypes = ActivityTypeModel.getTypesArray(data);
      }
    );
  }

  public init(client_id: number, deal?: number ) {
    this._clientService.getClientById(client_id).subscribe(
      data => {
        this._dealID = deal ? deal : null;
        this._client = new ClientModel(data);
        this.getActivityTypes(this._client.company.id);
      }
    );
  }

  private resetForm() {
    this._formAddActivity.controls['type_title'].setValue(null);
    this._formAddActivity.controls['description'].setValue(null);
  }

  public onChangeFileEvent(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this._formData.append('document', file, file.name);
    }
  }

  public createActivity(event: Event) {

    event.preventDefault();

    this._formData.append('employee', this._userID.toString());
    this._formData.append('client', this._client.id.toString());
    this._formData.append('deal', this._dealID ? this._dealID.toString() : '');
    this._formData.append('type_title', this._formAddActivity.controls['type_title'].value);
    this._formData.append('description', this._formAddActivity.controls['description'].value);

    this.disableAddButton = true;

    this._activityService.createActivity(this._formData).subscribe(
      data => {
        console.log(data);
        this.onCreate.emit(data);
        if (data === 100) {
          this._notificationService.sendNotification({
            title: 'Активность добавлена.'
          });
          this.resetForm();
          this._formData = new FormData();
          this.onCreate.emit(true);
          this.disableAddButton = false;
        }
      },
      err => {
        this.disableAddButton = false;
        console.log(err);
      }
    );
  }
}
