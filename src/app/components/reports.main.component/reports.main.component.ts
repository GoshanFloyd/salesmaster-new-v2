import {Component, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';
import {ReportService} from '../../services/report.service';

export interface IActivityReport {
  id: number;
  description: string;
  company: string;
  employee: {
    id: number,
    fullname: string
  };
  client: {
    id: number | string,
    title: string
  };
  deal: {
    id: number | string,
    title: string
  };
  type: {
    id: number,
    title: string
  };
  datetime_created: string;
  datetime_updated: string;
}

@Component({
  moduleId: module.id,
  templateUrl: './reports.main.component.html',
  selector: 'app-reports-main'
})

export class ReportsMainComponent implements OnInit {

  public activitiesReportList: Array<IActivityReport> = [];

  public isFileEnable: boolean = false;

  public currentCompanyID: number = this.user.getDefaultCompany().id;
  public currentUserID: number = this.user.id;

  public ruLocale: any = DATEPICKER_RU_LOCALE;

  public dateFilterStart: Date = new Date();
  public dateFilterEnd: Date = new Date();

  public currentCompanyUsers: Array<UserModel> = [];

  constructor (private _userRepository: UserRepository,
               private _userService: UserService,
               private _reportService: ReportService) {}

  ngOnInit(): void {
    this.dateFilterStart.setDate(this.dateFilterEnd.getDate() - 10);
    this.getUsers(this.currentCompanyID).subscribe(
      data => {
        this.getReports()
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

  private getDatesString(date: Date): string {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    return [date.getFullYear(),
      (mm>9 ? '' : '0') + mm,
      (dd>9 ? '' : '0') + dd
    ].join('-');
  }

  public changeCompany(): void {
    this.getUsers(this.currentCompanyID).subscribe(
      data => {
        this.getReports();
      }
    );
  }

  public changeUser(): void {
    this.getReports();
  }

  private getUsers(company_id: number): Observable<Array<UserModel>>{
    return Observable.create(observer => {
      this._userService.getUsers({
        'company_id': company_id
      }).subscribe(
        data => {
          this.currentCompanyUsers = UserModel.fromArray(data);
          observer.next(this.currentCompanyUsers);
        },
        err => {
          console.log(err);
          observer.error(err);
        },
        () => observer.complete()
      )
    });
  }

  public getDatesFormat(x: string) {
    return new Date(x).toLocaleString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  public getReports(type: string = 'json'): void {
    let params = {};

    params['company_id'] = this.currentCompanyID;
    params['output'] = type;

    if (this.currentUserID) {
      params['employee_id'] = this.currentUserID;
    }

    params['start'] = this.getDatesString(this.dateFilterStart);
    params['end'] = this.getDatesString(this.DateFilterEnd);

    if (type === 'json') {
      this._reportService.getAnalyticsReport(params).subscribe(
        data => {
          this.activitiesReportList = data;
          if (this.activitiesReportList.length > 0) {
            this.isFileEnable = true;
          } else {
            this.isFileEnable = false;
          }
        },
        err => console.log(err)
      );
    } else {
      this._reportService.getAnalyticsReport(params, 'blob').subscribe(
        data => {
          const blob: Blob = new Blob([data], {type: 'application/excel'});
          const fileName = 'Отчет по активностям.xls';
          const objectUrl: string = URL.createObjectURL(blob);
          const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

          a.href = objectUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();

          document.body.removeChild(a);
          URL.revokeObjectURL(objectUrl);
        },
        err => console.log(err)
      );
    }
  }

}
