import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';


@Component({
  templateUrl: './client.select.component.html',
  selector: 'app-client-select'
})
export class ClientSelectComponent  {

  @Output() onSetParent = new EventEmitter<ClientModel>();

  private _clientsParent: BehaviorSubject<ClientModel[]> = new BehaviorSubject(null);
  public clientsParent: Observable<ClientModel[]> = this._clientsParent.asObservable();

  constructor(private _clientService: ClientsService) { }

  public getClientParent(company: string) {
    this._clientService.getContacts({
      company_title: company
    }).subscribe(
      data => {
        this._clientsParent.next(ClientModel.getClientArray(data).filter(x => x.isParent));
      },
      err => console.log(err)
    );
  }

  public setParentClient(client: ClientModel) {
    this.onSetParent.emit(client);
  }
}

