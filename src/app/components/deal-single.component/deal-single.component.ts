import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientsService} from '../../services/clients.service';
import {DealService} from '../../services/deal.service';
import {ActivityService} from '../../services/activity.service';
import {DealModel} from '../../models/deal.model';
import {Observable} from 'rxjs/Observable';
import {ActivityModel} from '../../models/activity.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ActivityAddComponent} from '../activity-add.component/activity-add.component';
import {ActivityEditComponent} from '../activity-edit.component/activity-edit.component';

@Component({
  moduleId: module.id,
  templateUrl: './deal-single.component.html',
  host: { class: 'grid-row' }
})

export class DealSingleComponent implements OnInit{

  @ViewChild('activityAddModal') private modalAddActivity: ModalStandardComponent;
  @ViewChild('activityAddComponent') private activityAddComponent: ActivityAddComponent;

  @ViewChild('activityEditModal') private modalEditActivity: ModalStandardComponent;
  @ViewChild('activityEditComponent') private activityEditComponent: ActivityEditComponent;

  private _clientID: number;
  private _dealID: number;

  public currentDeal: DealModel = null;
  public activitiesOfCurrentDeal: Array<ActivityModel> = [];

  constructor (
    private _activateRoute: ActivatedRoute,
    private _clientService: ClientsService,
    private _dealServie: DealService,
    private _activityService: ActivityService) {}

  ngOnInit() {
    this._clientID = this._activateRoute.snapshot.params['id'];
    this._dealID = this._activateRoute.snapshot.params['deal_id'];
    this.getDeal(this._dealID).subscribe(
      data => {
        this.getActivities(this._dealID)
          .subscribe(data => {
          })
      }
    );
  }

  private getDeal(id: number): Observable<DealModel> {
    return this._dealServie.getDeal(id)
      .map(value => {
        this.currentDeal = new DealModel(value);
        return value;
      })
  }

  private getActivities(deal_id: number) {
    return this._activityService.getActivities({
      'deal_id': deal_id
    }).map((value) => {
      this.activitiesOfCurrentDeal = ActivityModel
        .fromArray(value)
        .sort((n1: ActivityModel, n2: ActivityModel) => n2.datetime_created.getTime() - n1.datetime_created.getTime())
      return value;
    })
  }

  public showModalAdd() {
    this.activityAddComponent.init(this._clientID, this._dealID);
    this.modalAddActivity.showModal();
  }

  public afterCreateActivity(value: boolean) {
    if (value) {
      this.modalAddActivity.hideModal();
      this.getActivities(this._dealID).subscribe(data => {});
    }
  }

  public showEditModal(activity: ActivityModel) {
    this.activityEditComponent.init(activity, this._clientID);
    this.modalEditActivity.showModal();
  }

  public afterEditActivity(value: boolean) {
    if (value) {
      this.modalEditActivity.hideModal();
      this.getActivities(this._dealID).subscribe(data => {});
    }
  }
}
