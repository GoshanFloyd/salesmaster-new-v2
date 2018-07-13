import {Component, EventEmitter, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';
import {ClientModel} from '../../models/client.model';

@Component({
  templateUrl: './product-list.component.html',
  moduleId: module.id,
  selector: 'app-product-list'
})

export class ProductListComponent {

  @Output() onSetProduct = new EventEmitter<ProductModel>();

  public productsList: Array<ProductModel> = [];

  public searchString: string;

  constructor (private _productService: ProductService) {}

  public init(company_id: number): void {
    this.getProducts(company_id).subscribe(
      data => {
        this.productsList = ProductModel.fromArray(data);
      },
      err => console.log(err)
    );
  }

  private getProducts(id: number) {
    return this._productService.getProducts({
      'company_id': id
    })
  }

  public addProduct(item: ProductModel) {
    this.onSetProduct.emit(item);
  }
}

