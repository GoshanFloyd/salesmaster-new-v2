import {Component} from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  moduleId: module.id,
  templateUrl: './product.add.component.html',
  selector: 'app-product-add'
})

export class ProductAddComponent {
  constructor(private _productService: ProductService) {}
}
