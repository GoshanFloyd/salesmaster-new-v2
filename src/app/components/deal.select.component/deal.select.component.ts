import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {DealModel} from '../../models/deal.model';

@Component({
  moduleId: module.id,
  templateUrl: './deal.select.component.html',
  selector: 'app-deal-select'
})
export class DealSelectComponent  {

  @Output() public onSetDeal = new EventEmitter<DealModel>();

  public listDeals: Array<DealModel> = [];

  constructor(private _dealService: DealService) { }

  public initDeals(id: number) {
    this._dealService.getDeals({
      'client_id': id
    }).subscribe(
      data => {
        this.listDeals = DealModel.fromArray(data);
      },
      err => {
        console.log(err)
      }
    );
  }

  public setDeal(deal: DealModel) {
    this.onSetDeal.emit(deal);
  }
}

