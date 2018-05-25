import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DEALS_STATUS} from '../../variables/variables';
import {DealService} from '../../services/deal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DealModel} from '../../models/deal.model';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './deal-edit.component.html',
  selector: 'app-edit-deal',
  host: { class: 'grid-row' }
})

export class DealEditComponent {

  public readonly dealStatus = DEALS_STATUS;

  public dealEditForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    total: new FormControl(0 )
  });

  private _id: number;

  public currentDeal: DealModel;

  constructor (private _dealService: DealService,
               private _router: Router,
               private _activateRouter: ActivatedRoute,
               private _notificationService: NotificationService) {
    this._id = this._activateRouter.snapshot.params['deal_id'];
    this.getDeal(this._id);
  }

  private getDeal(id: number) {
    this._dealService.getDeal(id).subscribe(
      data => {
        this.currentDeal = new DealModel(data);
        this.prepareForm(this.currentDeal);
      },
      err => console.log(err)
    );
  }

  private prepareForm(deal: DealModel) {
    this.dealEditForm.controls['title'].setValue(deal.title);
    this.dealEditForm.controls['description'].setValue(deal.description);
    this.dealEditForm.controls['status'].setValue(deal.status);
    this.dealEditForm.controls['total'].setValue(deal.total);
  }

  public editDeal(event: Event) {

    event.preventDefault();

    const deal = {
      'id': this.currentDeal.id,
      'employee': this.currentDeal.employee.id,
      'client': this.currentDeal.client.id,
      'product': this.currentDeal.product,
      'stage_id': this.currentDeal.stage_id,
      'title': this.dealEditForm.controls['title'].value,
      'description': this.dealEditForm.controls['description'].value,
      'status': this.dealEditForm.controls['status'].value,
      'total': this.dealEditForm.controls['total'].value
    };

    this._dealService.updateDeal(deal).subscribe(
      data => {
        this._notificationService.sendNotification({
          title: 'Сделка обновлена'
        });
        this._router.navigate([`/contacts/main/${this.currentDeal.client.id}`]);
      },
      err => console.log(err)
    );
  }

  public returnMainPage() {
    this._router.navigate([`/contacts/main/${this.currentDeal.client.id}`]);
  }
}
