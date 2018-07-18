import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DealService} from '../../services/deal.service';
import {DealStageModel} from '../../models/dealstage.model';

type MetaDataInputObject = {
  employee: number,
  client: number,
  stages: Array<DealStageModel>
}

@Component({
  moduleId: module.id,
  selector: 'app-deal-add',
  templateUrl: './deal-add.component.html'
})

export class DealAddComponent {

  @Input() metadata: MetaDataInputObject;
  @Output() onAddDeal = new EventEmitter<boolean>();

  public addDealButtonEnable: boolean = false;

  public _formNewDeal = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    stage_id: new FormControl(null, Validators.required),
    total: new FormControl(null),
  });

  constructor (private _dealService: DealService) {}

  public addDeal() {

    let newDeal = this._formNewDeal.value;

    newDeal['employee'] = this.metadata.employee;
    newDeal['client'] = this.metadata.client;
    newDeal['total'] = parseInt( newDeal['total'].replace(/\D+/g, ''));

    this.addDealButtonEnable = true;

    this._dealService.createDeal(newDeal).subscribe(
      data => {
        this.onAddDeal.emit(true);
      },
      err => console.log(err),
      () => this.addDealButtonEnable = false
    );
  }
}
