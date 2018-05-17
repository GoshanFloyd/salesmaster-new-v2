import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductModel} from '../../models/product.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './calltext.component.html',
  selector: 'app-calltext',
})

export class CalltextComponent implements OnInit {

  private _currentProduct: ProductModel;

  constructor (private _productService: ProductService,
               private _activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this._productService.getProduct(this._activateRoute.snapshot.params['id']).subscribe(
      data => {
        this._currentProduct = new ProductModel(data);
      },
      err => console.log(err)
    );
  }

  get currentProduct(): ProductModel {
    return this._currentProduct;
  }
}
