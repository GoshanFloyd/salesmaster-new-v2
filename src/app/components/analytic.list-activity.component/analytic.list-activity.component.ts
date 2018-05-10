import {Component, OnInit} from '@angular/core';
import {ActivityModel} from '../../models/activity.model';
import {UserRepository} from '../../repositories/user.repository';
import {ActivityService} from '../../services/activity.service';
import {NotificationService} from '../../services/notification.service';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './analytic.list-activity.component.html',
  selector: 'app-analytic-activity-list'
})

export class AnalyticListActivityComponent implements OnInit {

  private _activitiesList: Array<ActivityModel> = [];

  public isMyActivity = true;
  public currentCompany: number = this.user.company[0].id;

  constructor (private _userRepository: UserRepository,
               private _actiivtyService: ActivityService,
               private _notificationService: NotificationService) {}

  ngOnInit() {
    this._actiivtyService.getActivities({
      'company_id': this.currentCompany
    }).subscribe(
      data => {
        this._activitiesList = ActivityModel.fromArray(data);
      },
      err => console.log(err)
    );
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get activitiesList(): Array<ActivityModel> {

    let arr = this._activitiesList;

    if (this.isMyActivity) {
      arr = arr.filter(x => x.employee.id == this.user.id)
    }

    return arr;
  }
}
