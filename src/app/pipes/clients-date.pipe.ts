import {Pipe, PipeTransform} from '@angular/core';
import {ClientLightModel} from '../models/client.light.model.';

@Pipe({
  name: 'dateClient',
  pure: false
})
export class ClientsDatePipe implements PipeTransform {
  transform(value: Array<ClientLightModel>, sort_type: string) {
    if (!value || !sort_type) {
      return value;
    }

    switch (sort_type) {
      case 'start_old': {
        return value.sort((a, b) => a.datetime_created > b.datetime_created ? 1 : 0);
      }
      case 'start_new': {
        return value.sort((a, b) => a.datetime_created < b.datetime_created ? 1 : 0);
      }
      default: {
        return value.sort((a, b) => a.datetime_created < b.datetime_created ? 1 : 0);
      }
    }
  }
}
