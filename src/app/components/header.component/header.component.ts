import { Component } from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  constructor(private _userRepository: UserRepository) {}

  public mainHost: string = 'https://test.salesmaster.me';

  get user() {
    return this._userRepository.getMyUser();
  }
}
