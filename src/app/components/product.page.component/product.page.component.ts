import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './product.page.component.html',
  selector: 'app-product-page',
  host: { class: 'grid-row' }
})

export class ProductPageComponent {
  constructor () {}
}
