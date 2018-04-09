import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ActivatedRoute} from '@angular/router';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';
import {DealsKanbanComponent} from '../deals-kanban.component/deals-kanban.component';
import {ClientsService} from '../../services/clients.service';

@Component({
  moduleId: module.id,
  templateUrl: './client-single.component.html',
  host: { class: 'grid-row' }
})

export class ClientSingleComponent implements AfterViewChecked {

  @ViewChild('dealComponent') private dealKanbanComponent: DealsKanbanComponent;

  private id: number = null;

  constructor (private _clientRepository: ClientsRepository,
               private _activateRoute: ActivatedRoute) {

    this._activateRoute.params.subscribe((data) => {
      this.initClient();
    });
  }

  ngAfterViewChecked() {
    this._clientRepository.current_client.subscribe(data => {
      if (data) {
        this.dealKanbanComponent.initKanban(data.id, data.company.id);
      }
    });
  }

  private initClient() {
    this.id = this._activateRoute.snapshot.params['id'];
    this._clientRepository.getClientSingle(this.id);
  }

  get client(): Observable<ClientModel> {
    return this._clientRepository.current_client;
  }
}
