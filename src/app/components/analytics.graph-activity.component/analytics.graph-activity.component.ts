import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivityTypeService} from '../../services/activitytype.service';
import {AnalyticService} from '../../services/analytic.service';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ActivityTypeModel} from '../../models/acitivitytype.model';
import {Observable} from 'rxjs/Observable';
import {BaseChartDirective} from 'ng2-charts';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';

export interface ILineChartData {
  data: Array<number>;
  label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: './analytics.graph-activity.component.html',
  selector: 'app-analytics-graph-activity'
})

export class AnalyticsGraphActivityComponent implements OnInit {

  public ruLocale: any = DATEPICKER_RU_LOCALE;

  public dateFilterStart: Date = new Date();
  public dateFilterEnd: Date = new Date();

  public lineChartData:Array<ILineChartData> = [
    {data: [1,2,3], label: 'Пример аналитики'}
  ];
  public lineChartLabels:Array<any> = ['Первый','Второй','Третий'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public currentCompanyID: number = this.user.getDefaultCompany().id;

  public activitiesTypes: Array<ActivityTypeModel> = [];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor (private _activityTypeService: ActivityTypeService,
               private _analyticService: AnalyticService,
               private _userRepository: UserRepository) {}

  ngOnInit() {
    this.dateFilterStart.setDate(this.dateFilterEnd.getDate() - 10);
    this.getTypes(this.currentCompanyID).subscribe(
      data => {
        this.getAnalytiс();
      }
    )
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
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

  get DateFilterEnd(): Date {
    let d = new Date(this.dateFilterEnd);

    d.setDate(d.getDate() + 1);

    return d;
  }

  public changeCompany() {
    this.getTypes(this.currentCompanyID).subscribe(
      data => {
        this.getAnalytiс();
      }
    )
  }

  private getTypes(company_id: number): Observable<any> {
    return Observable.create(observer => {
      this._activityTypeService.getActivitiesTypes({
        'company_id': company_id
      }).subscribe(
        data => {
          this.activitiesTypes = ActivityTypeModel.getTypesArray(data);
          observer.next();
        },
        err => {
          observer.error(err);
        },
        () => observer.complete()
      )
    });
  }

  private getDatesString(date: Date): string {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    return [date.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
    ].join('-');
  }

  private generateArray(data: any) {

    this.lineChartData = [];
    this.lineChartLabels = [];

    for (let type of this.activitiesTypes) {

      let obj: ILineChartData = {
        data: [],
        label: type.title
      }

      for (let d of data) {
        obj.data.push(d[type.title])
      }

      this.lineChartData.push(obj);
    }

    for (let day of data) {
      this.lineChartLabels.push(day.created_day);
    }

    this.chart.datasets = this.lineChartData;
    this.chart.labels = this.lineChartLabels;
    this.chart.ngOnInit();
  }

  private getAnalytiс() {

    this._analyticService.getActivitiesAnalytic({
      'output': 'json',
      'subject': 'activity',
      'company_id': this.currentCompanyID,
      'start': this.getDatesString(this.dateFilterStart),
      'end': this.getDatesString(this.DateFilterEnd),
      'is_by_day': true
    }).subscribe(
      data => {
        if(data && data.length > 0) {
          this.generateArray(data)
        }
      },
      err => console.log(err)
    )
  }
}
