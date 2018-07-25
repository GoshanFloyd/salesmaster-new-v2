import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ActivityModel} from '../../models/activity.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ActivityEditComponent} from '../activity-edit.component/activity-edit.component';
import {DealSelectComponent} from '../deal.select.component/deal.select.component';
import {DealModel} from '../../models/deal.model';
import {ActivityService} from '../../services/activity.service';
import {NotificationService} from '../../services/notification.service';
import {EmployeeInfoComponent} from '../employee.info.component/employee.info.component';

@Component({
  moduleId: module.id,
  templateUrl: './activity.item.component.html',
  selector: 'app-activity-item',
  host: { class: 'mt-small' }
})

export class ActivityItemComponent {

  @Input() public activity: ActivityModel;
  @Input() public clientID: number;

  @Output() public onChangeActivity: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onTransitActivity: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalActivityEdit') private activityEditModal: ModalStandardComponent;
  @ViewChild('activityEditMainComponent') private activityEditComponent: ActivityEditComponent;

  @ViewChild('modalActivityTransit') private activityTransitModal: ModalStandardComponent;
  @ViewChild('dealSelectComponent') private dealSelectComponent: DealSelectComponent;

  @ViewChild('employeeInfoComponent') private employeeInfoComponent: EmployeeInfoComponent;

  constructor (private _activityService: ActivityService,
               private _notificationService: NotificationService) {}

  public onEditActivity(value: boolean) {
    if (value) {
      this.activityEditModal.hideModal();
      this.onChangeActivity.emit(value);
    }
  }

  public showEditModal(activity: ActivityModel) {
    if (this.isEditActivityTimeInterval(activity)) {
      this.activityEditComponent.init(activity, this.clientID);
      this.activityEditModal.showModal();
    } else {
      this._notificationService.sendNotification(
        {
          title: 'Редактирование запрещено',
          options: {
            body: 'С момента создании активности прошло 24 часа.'
          }
        });
    }
  }

  public showTransitActivityModal(): void {
    this.dealSelectComponent.initDeals(this.clientID);
    this.activityTransitModal.showModal();
  }

  public transitActivity(deal: DealModel) {
    this._activityService.updateActivity(this.activity.id, {
      'deal': deal.id
    }).subscribe(
      data => {
        this.onTransitActivity.emit(data);
        this.activityTransitModal.hideModal();
      },
      err => console.log(err)
    );
  }

  public isEditActivityTimeInterval(activity: ActivityModel): boolean {

    const activityStartDate = new Date(activity.datetime_created);

    const currentDate: Date = new Date();
    const activityDate = new Date(activityStartDate.setDate(activityStartDate.getDate() + 1));

    return activityDate > currentDate;
  }

  public showEmployeeInfo(event: Event, id: number) {
    event.preventDefault();

    this.employeeInfoComponent.getEmployeeInfo(id);
  }
}
