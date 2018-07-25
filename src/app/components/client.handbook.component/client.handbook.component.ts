import {Component, HostBinding, OnInit} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {IClientHandbook} from '../../models/client.model';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './client.handbook.component.html',
  selector: 'app-client-handbook',
})

export class ClientHandbookComponent implements OnInit {

  private _clients: Array<IClientHandbook> = [];

  public searchString: string = '';
  public currentCompanyID: number = this.user.getDefaultCompany().id;

  @HostBinding('class') private classList = 'col-sm-1 col-md-1 col-lg-1';

  constructor (private _clientService: ClientsService,
               private _userRepository: UserRepository) {}

  get clients(): Array<IClientHandbook> {
    return this._clients.filter(x => x.title.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1);
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  ngOnInit() {
    this.getClients(this.currentCompanyID);
  }

  public onChangeCompany(id: number) {
    this.getClients(id);
  }

  private getClients(company_id: number) {
    this._clientService.getClientsHandbook({
      'company_id': company_id
    }).subscribe(
      data => {
        this._clients = data;
      },
      err => console.log(err)
    );
  }
}
