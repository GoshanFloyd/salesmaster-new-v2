import {Component, OnInit} from '@angular/core';
import {ActivityModel} from '../../models/activity.model';
import {UserRepository} from '../../repositories/user.repository';
import {ActivityService} from '../../services/activity.service';
import {NotificationService} from '../../services/notification.service';
import {UserModel} from '../../models/user.model';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';
import {ActivityTypeModel} from '../../models/acitivitytype.model';
import {ActivityTypeService} from '../../services/activitytype.service';

@Component({
  moduleId: module.id,
  templateUrl: './analytic.list-activity.component.html',
  selector: 'app-analytic-activity-list'
})

export class AnalyticListActivityComponent implements OnInit {

  private _activitiesList: Array<ActivityModel> = [];
  private _activitiesTypes: Array<ActivityTypeModel> = [];

  public isMyActivity = true;
  public currentCompany: number = this.user.company[0].id;
  public currentActivityType: string = null;

  public ruLocale = DATEPICKER_RU_LOCALE;

  public dateFilterStart: Date = new Date();
  public dateFilterEnd: Date = new Date();

  constructor (private _userRepository: UserRepository,
               private _activityService: ActivityService,
               private _notificationService: NotificationService,
               private _activityTypesService: ActivityTypeService) {}

  ngOnInit() {
    this.dateFilterStart.setDate(this.dateFilterEnd.getDate() - 10);
    this.getActivity();
  }

  public getActivity(): void {
    this._activityService.getActivities({
      'client_company_id': this.currentCompany,
      'created_in_0': this.getDateString(this.dateFilterStart),
      'created_in_1': this.getDateString(this.dateFilterEnd)
    }).subscribe(
      data => {
        this._activitiesList = ActivityModel.fromArray(data);
        this.getActivitiesTypes(this.currentCompany);
      },
      err => console.log(err)
    );
  }

  public getActivitiesTypes(company_id: number): void {
    this._activityTypesService.getActivitiesTypes({
      'company_id': company_id
    }).subscribe(
      data => {
        this._activitiesTypes = ActivityTypeModel.getTypesArray(data);
      }
    )
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get activitiesTypes(): Array<ActivityTypeModel> {
    return this._activitiesTypes;
  }

  get activitiesList(): Array<ActivityModel> {

    let arr = this._activitiesList;

    if (this.isMyActivity) {
      arr = arr.filter(x => x.employee.id == this.user.id)
    }

    if (this.currentActivityType) {
      arr = arr.filter(x => x.type_title == this.currentActivityType)
    }

    return arr;
  }

  public getDateString(date: any) {
    const dateObj = new Date(date);

    const pad = (number) => {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    };

    return dateObj.getFullYear() +
      '-' + pad(dateObj.getMonth() + 1) +
      '-' + pad(dateObj.getDate());
  }

  get maxDateToFilterStart(): Date {
    let d = new Date();

    d.setDate(d.getDate() - 1);

    return d;
  }

  get maxDateToFilterEnd(): Date {
    let d = new Date();

    return d;
  }
}
