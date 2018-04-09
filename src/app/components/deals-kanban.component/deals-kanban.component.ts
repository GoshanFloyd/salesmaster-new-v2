import { Component } from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {DealStageService} from '../../services/dealstage.service';
import {DealStageModel} from '../../models/dealstage.model';
import {DealModel} from '../../models/deal.model';
import {DealService} from '../../services/deal.service';

@Component({
  moduleId: module.id,
  selector: 'app-deals-kanban',
  templateUrl: './deals-kanban.component.html'
})

export class DealsKanbanComponent {

  private _client_id: number = null;
  private _company_id: number = null;

  public _dealArraySortbale: any = {};

  public _dealStages: Array<DealStageModel> = [];
  public _dealsList: Array<DealModel> = [];

  constructor(private dragula: DragulaService,
              private _dealStageService: DealStageService,
              private _dealService: DealService) {

    dragula.drop.subscribe((value) => {
      console.log(this.findDealsById(value[1].id).objectUpdate);
      this._dealService.updateDeal(this.findDealsById(value[1].id).objectUpdate).subscribe(data => {
      })
    });
  }

  public initKanban(client_id: number, company_id: number) {
    if (this._client_id != client_id || this._company_id != company_id) {
      this._client_id = client_id;
      this._company_id = company_id;
      this.getStages(this._company_id);
    }
  }

  private getStages(company_id: number) {
    this._dealStageService.getStages({
      'company_id': company_id
    }).subscribe(data => {
      this._dealStages = [];
      this._dealStages = DealStageModel.fromArray(data);
      for (let stage of this._dealStages) {
        this._dealArraySortbale[stage.id] = [];
      }
      this.getDeals(this._client_id);
    })
  }

  private getDeals(client_id: number) {
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
}
