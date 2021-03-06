import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {ClientsRepository} from '../../repositories/clients.repository';
import {UserModel} from '../../models/user.model';
import {Observable} from 'rxjs/Observable';
import {ClientLightModel} from '../../models/client.light.model.';

@Component({
  moduleId: module.id,
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html'
})

export class ClientsListComponent implements AfterViewInit{

  public searchString: string = '';
  public company_filter: number;
  public dateFilterClients: string = 'start_new';
  public my_client_filter: boolean = false;

  @ViewChild('bodyListClients') public bodyListClients: ElementRef;

  constructor (public _userRepository: UserRepository,
               public _clientsRepository: ClientsRepository) {
    this.company_filter = this._clientsRepository.currentCompanyID;
    this.searchString = this._clientsRepository.currentSearchString;
  }

  ngAfterViewInit() {
    const el = document.getElementById(this._clientsRepository.currentScrollID + '-scroll_id');
    if (el){
      el.scrollIntoView();
    }
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get clients(): Observable<ClientLightModel[]> {
    return this._clientsRepository.clients_main_light;
  }

  public changeSearchString() {
    this._clientsRepository.setCurrentSearchString(this.searchString);
  }

  public changeCompany(event: any) {
    this._clientsRepository.setCurrentCompanyID(this.company_filter);
    this._clientsRepository.getContactsLight({
      company_id: this.company_filter
    });
  }

  public setCurrentClient(index: number) {
    this._clientsRepository.currentScrollID = index;
  }
}
