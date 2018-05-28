import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ActivityModel} from '../../models/activity.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ActivityEditComponent} from '../activity-edit.component/activity-edit.component';
import {DealSelectComponent} from '../deal.select.component/deal.select.component';
import {DealModel} from '../../models/deal.model';
import {ActivityService} from '../../services/activity.service';

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

  constructor (private _activityService: ActivityService) {}

  public onEditActivity(value: boolean) {
    if (value) {
      this.activityEditModal.hideModal();
      this.onChangeActivity.emit(value);
    }
  }

  public showEditModal(activity: ActivityModel) {
    this.activityEditComponent.init(activity, this.clientID);
    this.activityEditModal.showModal();
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
    )
  }
}
