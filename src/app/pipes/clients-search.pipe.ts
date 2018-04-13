import {Pipe, PipeTransform} from '@angular/core';
import {ClientModel} from '../models/client.model';

@Pipe({
  name: 'searchClient',
  pure: false
})
export class ClientsSearchPipe implements PipeTransform{
  transform(value: Array<ClientModel>, search: string) {
    if (!value || !search) {
      return value;
    }

    return value.filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }
}
