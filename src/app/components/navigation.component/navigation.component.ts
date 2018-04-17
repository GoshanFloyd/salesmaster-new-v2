import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent {

  constructor() {}

  public isActiveRoute(link: string): boolean {
    const path = location.pathname;

    if (path.indexOf(link) > -1) {
      return true
    } else {
      return false;
    }
  }
}
