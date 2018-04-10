import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ActivatedRoute} from '@angular/router';
import {ClientModel} from '../../models/client.model';
import {Observable} from 'rxjs/Observable';
import {DealsKanbanComponent} from '../deals-kanban.component/deals-kanban.component';
import {ClientsService} from '../../services/clients.service';
import {ActivityService} from '../../services/activity.service';
import {ActivityModel} from '../../models/activity.model';

@Component({
  moduleId: module.id,
  templateUrl: './client-single.component.html',
  host: { class: 'grid-row' }
})

export class ClientSingleComponent implements AfterViewChecked {

  @ViewChild('dealComponent') private dealKanbanComponent: DealsKanbanComponent;

  private id: number = null;

  public clientActivities: Array<ActivityModel> = [];

  constructor (private _clientRepository: ClientsRepository,
               private _activateRoute: ActivatedRoute,
               private _activityService: ActivityService) {

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
    this.getClientActivities(this.id);
  }

  private getClientActivities(id: number) {
    this._activityService.getActivities({
      'client_id': id,
      'deal_null': true
    }).subscribe(
      data => {
        console.log(data);
        this.clientActivities = ActivityModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  get client(): Observable<ClientModel> {
    return this._clientRepository.current_client;
  }
}
