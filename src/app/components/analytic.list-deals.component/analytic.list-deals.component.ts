import {Component, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {DealService} from '../../services/deal.service';
import {UserModel} from '../../models/user.model';
import {DealModel} from '../../models/deal.model';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';
import {DealStageService} from '../../services/dealstage.service';
import {DealStageModel} from '../../models/dealstage.model';

@Component({
  moduleId: module.id,
  templateUrl: './analytic.list-deals.component.html'
})

export class AnalyticListDealsComponent implements OnInit{

  public currentCompanyID: number = this.user.company[0].id;
  public isMyProjects: boolean = false;
  public currentStageID: number = null;

  public ruLocale = DATEPICKER_RU_LOCALE;

  public dateFilterStart: Date = new Date();
  public dateFilterEnd: Date = new Date();

  private _projectsList: Array<DealModel> = [];
  private _projectsStagesList: Array<DealStageModel> = [];

  constructor (private _userRepository: UserRepository,
               private _dealService: DealService,
               private _dealsStagesService: DealStageService) { }


  ngOnInit() {
    this.getProjectsStagesOfCurrentCompany(this.currentCompanyID);
  }

  public getProjects() {

    this.dateFilterStart.setDate(this.dateFilterEnd.getDate() - 10);

    this._dealService.getDeals({
      'client_company_id': this.currentCompanyID,
      'created_in_0': this.getDateString(this.dateFilterStart),
      'created_in_1': this.getDateString(this.dateFilterEnd)
    }).subscribe(
      data => {
        this._projectsList = DealModel.fromArray(data);
      },
      err => console.log(err)
    )
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

  public getProjectsStagesOfCurrentCompany(company_id: number) {
    this._dealsStagesService.getStages({
      'company_id': company_id
    }).subscribe(
      data => {
        this._projectsStagesList = DealStageModel.fromArray(data);
        this.getProjects();
      },
      err => console.log(err)
    )
  }

  public getProjectStage(stage_id: number): string {

    const stage = this._projectsStagesList.find(x => x.id == stage_id);

    return stage && stage.title ? stage.title : 'Данная стадия не найдена';
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get projectsStages(): Array<DealStageModel> {
    return this._projectsStagesList;
  }

  get projectsList(): Array<DealModel> {

    let arr = this._projectsList

    if (this.isMyProjects) {
      arr = arr.filter(x => x.employee.id == this.user.id);
    }

    if (this.currentStageID) {
      arr = arr.filter(x => x.stage_id == this.currentStageID);
    }

    return arr;
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
