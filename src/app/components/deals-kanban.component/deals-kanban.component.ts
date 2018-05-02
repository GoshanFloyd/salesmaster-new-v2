import {Component, ViewChild} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {DealStageService} from '../../services/dealstage.service';
import {DealStageModel} from '../../models/dealstage.model';
import {DealModel} from '../../models/deal.model';
import {DealService} from '../../services/deal.service';
import {NotificationService} from '../../services/notification.service';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {DealAddComponent} from '../deal-add.component/deal-add.component';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-deals-kanban',
  templateUrl: './deals-kanban.component.html'
})

export class DealsKanbanComponent {

  @ViewChild('dealAddModal') modalAddDeal: ModalStandardComponent;
  @ViewChild('dealAddComponent') dealAddComponent: DealAddComponent;

  public dataToCreateDeal: any = null;

  private _currentCompanyID: number = this.user.company[0].id;
  private _currentUserID: number = this._userRepository.getMyUser().id;

  private _client_id: number = null;
  private _company_id: number = null;
  private _type: string;

  public _dealArraySortbale: any = {};

  public _dealStages: Array<DealStageModel> = [];
  public _dealsList: Array<DealModel> = [];
  public _userList: Array<UserModel> = [];

  constructor(private dragula: DragulaService,
              private _dealStageService: DealStageService,
              private _dealService: DealService,
              private _notificationService: NotificationService,
              private _userRepository: UserRepository,
              private _userService: UserService) {

    dragula.dropModel.subscribe((value) => {
      this._dealService.updateDeal(this.findDealsById(value[1].id).objectUpdate).subscribe(data => {
        const updatedDeal = new DealModel(data);
        this._notificationService.sendNotification('Сделка обновлена',
          `Сделка с наименованием ${updatedDeal.title} перенесена на стадию ${this.findStage(updatedDeal.stage_id).title}`)
      })
    });
  }

  get user() {
    return this._userRepository.getMyUser();
  }

  public onChangeCompany(id: number) {
    this.getStages(id);
  }

  public onChangeUser(id: number) {
    this.getStages(this._currentCompanyID);
  }

  public initKanban(client_id?: number, company_id?: number, type: string = 'standard'): void {
    if (this._client_id != client_id && this._company_id != company_id) {
      this._client_id = client_id;
      this._company_id = company_id;
      this._type = type;
      if (type =='standard') {
        this.getStages(this._company_id);
      } else {
        this.getUsers();
        this._company_id = this._userRepository.getMyUser().company[0].id;
        this.getStages(this._userRepository.getMyUser().company[0].id);
      }
    }
  }

  private getStages(company_id: number): void {
    this._dealStageService.getStages({
      'company_id': company_id
    }).subscribe(data => {
      this._dealStages = [];
      this._dealStages = DealStageModel.fromArray(data);
      console.log(this._dealStages);
      for (let stage of this._dealStages) {
        this._dealArraySortbale[stage.id] = [];
      };
      if (this._type == 'standard') {
        this.getDeals(this._client_id)
      } else {
        this.getDealsByEmployee(this._currentUserID);
      }
    })
  }

  public getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        this._userList = UserModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  private getDealsByEmployee(employee_id: number) {
    this._dealService.getDeals({
      'employee_id': employee_id
    }).subscribe(data => {
      this._dealsList = DealModel.fromArray(data);
      for (let deal of this._dealsList) {
        if(this._dealArraySortbale[deal.stage_id]) {
          this._dealArraySortbale[deal.stage_id].push(deal);
        } else {
          this._dealArraySortbale[deal.stage_id] = [];
          this._dealArraySortbale[deal.stage_id].push(deal);
        }
      }
    })
  }

  private getDeals(client_id: number): void {
    this._dealService.getDeals({
      'client_id': client_id
    }).subscribe(data => {
      this._dealsList = DealModel.fromArray(data);
      for (let deal of this._dealsList) {
        this._dealArraySortbale[deal.stage_id].push(deal);
      }
    })
  }

  private findDealsById(id: number): DealModel {
    for (let stage of this._dealStages) {
      for (let deal of this._dealArraySortbale[stage.id]) {
        if (id == deal.id) {
          deal.stage_id = stage.id;
          return deal;
        }
      }
    }
    return null;
  }

  private findStage(id: number): DealStageModel {
    for (let stage of this._dealStages) {
      if (stage.id == id) {
        return stage;
      }
    }
    return null;
  }

  private resetMainArray(): void {
    let arrayResetObject = {};
    for (let stage of this._dealStages) {
      arrayResetObject[stage.id] = [];
    }
    this._dealArraySortbale = arrayResetObject;
  }

  public onAddDeal(event: boolean): void{
    if (event) {
      this.modalAddDeal.hideModal();
      this.resetMainArray();
      this.getDeals(this._client_id);
    }
  }

  private showAddModal(event: any): void {
    this.dataToCreateDeal = {
      'employee': this._userRepository.getMyUser().id,
      'client': this._client_id,
      'stages': this._dealStages
    }
    this.modalAddDeal.showModal();
  }

  get client_id(): number {
    return this._client_id;
  }
}
