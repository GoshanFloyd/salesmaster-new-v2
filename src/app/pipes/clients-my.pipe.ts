import { Pipe, PipeTransform} from '@angular/core';
import {ClientModel} from '../models/client.model';
import {UserRepository} from '../repositories/user.repository';


@Pipe({
  name: 'myClients',
  pure: false
})
export class ClientsMyPipe implements PipeTransform {

  constructor (private _userRepository: UserRepository) {}

  transform(array: ClientModel[], selector: boolean) {
    if (selector) {
      return array.filter((item) => {
        return item.employee.id == this._userRepository.getMyUser().id;
      });
    }
    else {
      return array;
    }
  }
}
