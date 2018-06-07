import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  private _items: MenuItem[];

  constructor (private _router: Router) {
  }

  ngOnInit( ) {

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
