import {Component, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ProductModel} from '../../models/product.model';
import {ProductSingleComponent} from '../product.single.component/product.single.component';

@Component({
  moduleId: module.id,
  templateUrl: './product-main.component.html',
  selector: 'app-product-main',
  host: { class: 'grid-row' }
})

export class ProductMainComponent {

  @ViewChild('productSingleComponent') private productSingleComponent: ProductSingleComponent;

  private _currentProduct: ProductModel = null;

  constructor (private _userRepository: UserRepository) { }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  public selectProduct(product: ProductModel) {
    this._currentProduct = product;
    this.productSingleComponent.initCurrentProduct(this._currentProduct);
  }
}
