import { Component } from '@angular/core';
import {OfflineService} from '../../services/offline.service';
import { environment } from '../../../environments/environment';

@Component({
  moduleId: module.id,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [
    'navigation.component.css'
  ]
})

export class NavigationComponent {

  public readonly VERSION: string = environment.VERSION;

  public status: any;

  constructor(private _offline: OfflineService) {
    this._offline.status.subscribe(
      data => {
        this.status = data;
      }
    );
  }

  public isActiveRoute(link: string): boolean {
    const path = location.pathname;

    if (path.indexOf(link) > -1) {
      return true;
    } else {
      return false;
    }
  }

}
