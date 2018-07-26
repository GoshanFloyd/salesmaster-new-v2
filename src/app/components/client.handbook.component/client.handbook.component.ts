import {Component, HostBinding, OnInit} from '@angular/core';
import {ClientsService} from '../../services/clients.service';
import {CustomFieldsArrayField, EmailArrayField, IClientHandbook, PhoneArrayField} from '../../models/client.model';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {Logger} from '../../classes/logger';

@Component({
  moduleId: module.id,
  templateUrl: './client.handbook.component.html',
  selector: 'app-client-handbook',
})

export class ClientHandbookComponent implements OnInit {

  private _clients: Array<IClientHandbook> = [];

  public searchString = '';
  public currentCompanyID: number = this.user.getDefaultCompany().id;

  @HostBinding('class') private classList = 'col-sm-1 col-md-1 col-lg-1';

  constructor (private _clientService: ClientsService,
               private _userRepository: UserRepository) {
  }

  get clients(): Array<IClientHandbook> {
    return this._clients.filter(x =>
      (x.title.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1) ||
      this.searchPhones(this.searchString, x.phones) ||
      this.searchEmails(this.searchString, x.emails) ||
      this.searchCustomFields(this.searchString, x.customfields)
    );
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

  public searchPhones(request: string, array: PhoneArrayField): boolean {
    for (const i of array) {
      if (i.owner_name.toLowerCase().indexOf(request.toLowerCase()) !== -1
        || i.number.toLowerCase().indexOf(request.toLowerCase()) !== -1) {
        return true;
      }
    }

    return false;
  }

  public searchEmails(request: string, array: EmailArrayField): boolean {
    for (const i of array) {
      if (i.owner_name.toLowerCase().indexOf(request.toLowerCase()) !== -1
        || i.address.toLowerCase().indexOf(request.toLowerCase()) !== -1) {
        return true;
      }
    }

    return false;
  }

  public searchCustomFields(request: string, array: CustomFieldsArrayField): boolean {
    for (const i of array) {
      if (i.key.toLowerCase().indexOf(request.toLowerCase()) !== -1
        || i.value.toLowerCase().indexOf(request.toLowerCase()) !== -1) {
        return true;
      }
    }

    return false;
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
