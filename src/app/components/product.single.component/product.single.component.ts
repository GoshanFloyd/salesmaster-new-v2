import {Component} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  moduleId: module.id,
  templateUrl: './product.single.component.html',
  selector: 'app-product-single'
})

export class ProductSingleComponent {

  private _currentProduct: ProductModel;

  private _childrenProducts: Array<ProductModel>;

  constructor (private _productService: ProductService) {}

  public initCurrentProduct(p: ProductModel) {
    this._currentProduct = p;

    this._productService.getProducts({
      'parent_id': this._currentProduct.id
    }).subscribe(
      data => {
        this._childrenProducts = ProductModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  get currentProduct(): ProductModel {
    return this._currentProduct;
  }

  get childrenProducts(): Array<ProductModel> {
    return this._childrenProducts;
  }

  public openCallText(){
    window.open(`/calltext/`+this._currentProduct.id);
  }
}
