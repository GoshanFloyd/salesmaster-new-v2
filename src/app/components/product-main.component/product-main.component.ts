import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './product-main.component.html',
  selector: 'app-product-main',
  host: { class: 'grid-row' }
})

export class ProductMainComponent {
  constructor ( ) { }
}
