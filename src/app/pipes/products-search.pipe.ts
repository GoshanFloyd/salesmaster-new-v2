import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from '../models/product.model';

@Pipe({
  name: 'searchProduct',
  pure: false
})
export class ProductsSearchPipe implements PipeTransform{
  transform(value: Array<ProductModel>, search: string) {
    if (!value || !search) {
      return value;
    }

    return value.filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }
}
