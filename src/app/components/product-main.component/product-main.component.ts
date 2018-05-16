import {Component} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ProductModel} from '../../models/product.model';

@Component({
  moduleId: module.id,
  templateUrl: './product-main.component.html',
  selector: 'app-product-main',
  host: { class: 'grid-row' }
})

export class ProductMainComponent {

  private _currentProduct: ProductModel = null;

  constructor (private _userRepository: UserRepository) { }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  public selectProduct(product: ProductModel) {
    this._currentProduct = product;
    console.log(this._currentProduct);
  }
}
