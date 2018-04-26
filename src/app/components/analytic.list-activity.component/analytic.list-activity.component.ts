import {Component, OnInit} from '@angular/core';
import {ActivityModel} from '../../models/activity.model';
import {UserRepository} from '../../repositories/user.repository';
import {ActivityService} from '../../services/activity.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './analytic.list-activity.component.html',
  selector: 'app-analytic-activity-list'
})

export class AnalyticListActivityComponent implements OnInit{

  public activitiesList: Array<ActivityModel> = [];

  public isMyActivity: boolean = true;

  constructor (private _userRepository: UserRepository,
               private _actiivtyService: ActivityService,
               private _notificationService: NotificationService) {}

  ngOnInit() {
    this._actiivtyService.getActivities({
      'employee_id': this._userRepository.getMyUser().id
    }).subscribe(
      data => {
        this.activitiesList = ActivityModel.fromArray(data);
        console.log(this.activitiesList);
      },
      err => console.log(err)
    )
  }
}
