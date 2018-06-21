import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientsService} from '../../services/clients.service';
import {DealService} from '../../services/deal.service';
import {ActivityService} from '../../services/activity.service';
import {DealModel} from '../../models/deal.model';
import {Observable} from 'rxjs/Observable';
import {ActivityModel} from '../../models/activity.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {ActivityAddComponent} from '../activity-add.component/activity-add.component';
import {ActivityEditComponent} from '../activity-edit.component/activity-edit.component';
import {ProductListComponent} from '../product-list.component/product-list.component';
import {ProductModel} from '../../models/product.model';
import {NotificationService} from '../../services/notification.service';
import {FormGroup} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: './deal-single.component.html',
  host: { class: 'grid-row' }
})

export class DealSingleComponent implements OnInit{

  @ViewChild('activityAddModal') private modalAddActivity: ModalStandardComponent;
  @ViewChild('activityAddComponent') private activityAddComponent: ActivityAddComponent;

  @ViewChild('productAddModal') private modalAddProduct: ModalStandardComponent;
  @ViewChild('productListComponent') private productListComponent: ProductListComponent;

  @ViewChild('closeDealModal') private modalCloseDeal: ModalStandardComponent;

  private _clientID: number;
  private _dealID: number;
  public _companyID: number;

  public currentDeal: DealModel = null;
  public activitiesOfCurrentDeal: Array<ActivityModel> = [];

  public productInDeal: Array<number> = [];

  public statusCloseDeal: boolean = true;

  constructor (
    private _activateRoute: ActivatedRoute,
    private _clientService: ClientsService,
    private _dealService: DealService,
    private _activityService: ActivityService,
    private _notificationService: NotificationService) {}

  ngOnInit() {
    this._clientID = this._activateRoute.snapshot.params['id'];
    this._dealID = this._activateRoute.snapshot.params['deal_id'];
    this.getDeal(this._dealID).subscribe(
      data => {
        console.log(data);
        this.getCompany(this._clientID).subscribe(
          data => {
            this._companyID = data.company.id;
            this.getActivities(this._dealID)
              .subscribe(data => {} );
          }
        );
      }
    );
  }

  get clientID(): number {
    return this._clientID;
  }

  private getCompany(id: number) {
    return this._clientService.getClientById(id)
  }

  private getDeal(id: number): Observable<DealModel> {
    return this._dealService.getDeal(id)
      .map(value => {
        this.currentDeal = new DealModel(value);
        this.productInDeal = this.currentDeal.product.map(x => x.id);
        return value;
      });
  }

  private getActivities(deal_id: number) {
    return this._activityService.getActivities({
      'deal_id': deal_id
    }).map((value) => {
      this.activitiesOfCurrentDeal = ActivityModel
        .fromArray(value)
        .sort((n1: ActivityModel, n2: ActivityModel) => n2.datetime_created.getTime() - n1.datetime_created.getTime())
      return value;
    });
  }

  public showModalAdd() {
    this.activityAddComponent.init(this._clientID, this._dealID);
    this.modalAddActivity.showModal();
  }

  public afterCreateActivity(value: boolean|number) {
    if (typeof value === 'number') {
      this.modalAddActivity.percentLoad = value;
    }
    if (typeof value === 'boolean') {
      this.modalAddActivity.percentLoad = 0;
      this.modalAddActivity.hideModal();
      this.getActivities(this._dealID).subscribe(data => {});
    }
  }

  public afterEditActivity(value: boolean) {
    if (value) {
      this.getActivities(this._dealID).subscribe(data => {});
    }
  }

  public showProductsModal(company_id: number) {
    this.modalAddProduct.showModal();
    this.productListComponent.init(company_id);
  }

  public addProductToDeal(product: ProductModel) {
    if(!this.productInDeal.find(x => x == product.id)) {

      const updatedDeal = {
        id: this.currentDeal.id,
        product: [product.id]
      };

      this._dealService.updateDeal(updatedDeal).subscribe(
        data => {
          this.currentDeal = new DealModel(data);
          this.productInDeal = this.currentDeal.product.map(x => x.id);
        },
        err => console.log(err)
      );
    } else {
      this._notificationService.sendNotification({
        title: 'Данный продукт уже присутствует в сделке'
      });
    }
  }

  public showModalCloseDeal(){
    this.modalCloseDeal.showModal();
  }

  public deleteProduct(id: number) {

    const updatedDeal = {
      id: this.currentDeal.id,
      product: [id]
    };

    this._dealService.updateDeal(updatedDeal).subscribe(
      data => {
        this.currentDeal = new DealModel(data);
        this.productInDeal = this.currentDeal.product.map(x => x.id);
        this._notificationService.sendNotification({
          title: 'Продукт удален'
        });
      },
      err => console.log(err)
    );
  }

  public changeStatus(event: any) {
    this.statusCloseDeal = !this.statusCloseDeal;
  }

  public closeDeal(event: Event) {
    this._dealService.updateDeal({
      id: this._dealID,
      status: this.statusCloseDeal ? 'completed' : 'failed'
    }).subscribe(
      data => {
        this.getDeal(this._dealID).subscribe(
          data => {
            this.getCompany(this._clientID).subscribe(
              data => {
                this._companyID = data.company.id;
                this.getActivities(this._dealID)
                  .subscribe(data => {} );
              }
            );
          }
        );
      },
      err => console.log(err),
      () => this.modalCloseDeal.hideModal()
    );
  }
}
