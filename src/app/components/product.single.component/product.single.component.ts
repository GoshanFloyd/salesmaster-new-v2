import {Component} from '@angular/core';
import {ProductModel} from '../../models/product.model';

@Component({
  moduleId: module.id,
  templateUrl: './product.single.component.html',
  selector: 'app-product-single'
})

export class ProductSingleComponent {

  private _currentProduct: ProductModel;

  constructor () {}

  public initCurrentProduct(p: ProductModel) {
    this._currentProduct = p;
  }

  get currentProduct(): ProductModel {
    return this._currentProduct;
  }

  public openCallText(){
    window.open(`/calltext/`+this._currentProduct.id);
  }
}
