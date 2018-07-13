import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {OfflineService} from './services/offline.service';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  private _items: MenuItem[];

  constructor (private _router: Router,
               private _offline: OfflineService,
               private swUpdate: SwUpdate) {
  }

  ngOnInit( ) {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('Появилась новая версия CRM. Для принятия обновления неоходима перезагрузка страницы. Перезагрузить?')) {

          window.location.reload();
        }
      });
    }

    this._items = [
      {
        label: 'Добавить клиента',
        command: (event) => {
          this._router.navigateByUrl('/contacts/main/add');
        }
      }
    ];

    this._router.navigate(['/'], { queryParams: { pathname: window.location.pathname }});
  }

  get itemsMenu(): MenuItem[] {
    return this._items;
  }
}
