import {Component, OnInit, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';
import {ILineChartData} from '../analytics.graph-activity.component/analytics.graph-activity.component';
import {DealStageModel} from '../../models/dealstage.model';
import {DealStageService} from '../../services/dealstage.service';
import {Observable} from 'rxjs/Observable';
import {AnalyticService} from '../../services/analytic.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  moduleId: module.id,
  templateUrl: './analytics.graph-deals.component.html',
  selector: 'app-analytics-graph-deals'
})

export class AnalyticsGraphDealsComponent implements OnInit {

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

  public dealsStages: Array<DealStageModel> = [];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor (private _userRepository: UserRepository,
               private _dealStagesService: DealStageService,
               private _analyticService: AnalyticService) {}

  ngOnInit() {
    this.dateFilterStart.setDate(this.dateFilterEnd.getDate() - 10);
    this.getStages(this.currentCompanyID).subscribe(
      data => {
        this.getAnalytiс();
      }
    );
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
    this.getStages(this.currentCompanyID).subscribe(
      data => {
        this.getAnalytiс();
      }
    )
  }

  private getDatesString(date: Date): string {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    return [date.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
    ].join('-');
  }

  private getStages(company_id: number): Observable<any> {
    return Observable.create(observer => {
      this._dealStagesService.getStages({
        'company_id': company_id
      }).subscribe(
        data => {
          this.dealsStages = DealStageModel.fromArray(data);
          observer.next();
        },
        err => {
          observer.error(err);
        },
        () => observer.complete()
      )
    });
  }

  private getAnalytiс() {

    this._analyticService.getAnalytic({
      'output': 'json',
      'subject': 'deal',
      'company_id': this.currentCompanyID,
      'start': this.getDatesString(this.dateFilterStart),
      'end': this.getDatesString(this.DateFilterEnd),
      'is_by_day': true
    }).subscribe(
      data => {
        console.log(data);
        if(data && data.length > 0) {
          this.generateArray(data)
        }
      },
      err => console.log(err)
    )
  }

  private generateArray(data: any) {
    this.lineChartData = [];
    this.lineChartLabels = [];

    for (let type of this.dealsStages) {

      let obj: ILineChartData = {
        data: [],
        label: type.title
      }

      for (let d of data) {
        obj.data.push(d['stages'][type.title])
      }

      this.lineChartData.push(obj);
    }

    let doneDeals: ILineChartData = {
      data: [],
      label: 'Завершено'
    }

    let failDeals: ILineChartData = {
      data: [],
      label: 'Завершено'
    }

    for (let d of data) {
      doneDeals.data.push(d['Завершено'])
      failDeals.data.push(d['Провалено'])
    }

    this.lineChartData.push(doneDeals);
    this.lineChartData.push(failDeals);


    for (let day of data) {
      this.lineChartLabels.push(day.created_day);
    }

    this.chart.datasets = this.lineChartData;
    this.chart.labels = this.lineChartLabels;
    this.chart.ngOnInit();
    }
 }
