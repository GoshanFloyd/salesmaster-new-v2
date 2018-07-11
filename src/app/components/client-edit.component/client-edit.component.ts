import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../../services/clients.service';
import {ClientModel} from '../../models/client.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../models/user.model';
import {UserRepository} from '../../repositories/user.repository';
import {FORMS_YURLICO, TYPE_EMAIL, TYPE_FIZLICO, TYPE_PHONE, TYPE_YURLICO} from '../../variables/variables';
import {ClientSelectComponent} from '../client.select.component/client.select.component';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {NotificationService} from '../../services/notification.service';
import {ClientsRepository} from '../../repositories/clients.repository';


@Component({
  moduleId: module.id,
  templateUrl: './client-edit.component.html',
  host: { class: 'grid-row' }
})

export class ClientEditComponent implements OnInit {

  @ViewChild(ClientSelectComponent) private clientSelectComponent: ClientSelectComponent;
  @ViewChild(ModalStandardComponent) private modalStandard: ModalStandardComponent;

  public readonly types_fizlico = TYPE_FIZLICO;
  public readonly types_yurlico = TYPE_YURLICO;
  public readonly forms_yurlico = FORMS_YURLICO;
  public readonly type_phones = TYPE_PHONE;
  public readonly type_emails = TYPE_EMAIL;

  private _id: number;

  public client: ClientModel = null;
  public parentClient: ClientModel = null;

  private editableClient: FormGroup;

  constructor (private _activateRouter: ActivatedRoute,
               private _clientService: ClientsService,
               private _userRepository: UserRepository,
               private _router: Router,
               private _notificationService: NotificationService,
               private _clientRepository: ClientsRepository) {
    this.editableClient = new FormGroup({
      title: new FormControl('', Validators.required),
      company: new FormControl(null, Validators.required),
      parent: new FormControl(null),
      employee: new FormControl(null),
      type: new FormControl('fizlico', Validators.required),
      street: new FormControl(null),
      postcode: new FormControl(null),
      requisite: new FormControl(null),
      fizlico_type: new FormControl(null, ),
      yurlico_type: new FormControl(null, ),
      yurlico_form: new FormControl(null, ),
      customfields: new FormArray([]),
      phones: new FormArray([]),
      emails: new FormArray([])
    });
  }

  ngOnInit() {
    this._id = this._activateRouter.snapshot.params['id'];
    this.prepareForm(this._id);
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  private prepareForm(client_id: number): void {
    this._clientService.getClientById(client_id).subscribe(
      data => {

        this.editableClient.reset();

        this.client = new ClientModel(data);
        this.editableClient.controls['title'].setValue(this.client.title);
        this.editableClient.controls['company'].setValue(this.client.company.title);
        this.editableClient.controls['employee'].setValue(this.client.employee.id);
        this.editableClient.controls['type'].setValue(this.client.type);
        this.editableClient.controls['street'].setValue(this.client.street);
        this.editableClient.controls['postcode'].setValue(this.client.postcode);
        this.editableClient.controls['requisite'].setValue(this.client.requisite);
        this.editableClient.controls['fizlico_type'].setValue(this.client.fizlico_type);
        this.editableClient.controls['yurlico_type'].setValue(this.client.yurlico_type);
        this.editableClient.controls['yurlico_form'].setValue(this.client.yurlico_form);

        if(this.client.parent.id) {
          this.prepareParentClient(this.client.parent.id);
        }

        this.preparePhones();
        this.prepareEmails();
        this.prepareCustomFields();
        this.changeClientType(this.client.type);
      },
      err => console.log(err)
    );
  }

  private prepareParentClient(id: number) {
    this.editableClient.controls['parent'].setValue(id);
    this._clientService.getClientById(id).subscribe(
      data => {
        this.parentClient = new ClientModel(data);
      }
    );
  }

  private preparePhones(): void {
    while ((this.editableClient.controls['phones'] as FormArray).length !== 0) {
      (this.editableClient.controls['phones'] as FormArray).removeAt(0)
    }
    for (const phones of this.client.phones) {
      (this.editableClient.controls['phones'] as FormArray).push(new FormGroup({
        owner_name: new FormControl(phones.owner_name, Validators.required),
        number: new FormControl(phones.number, Validators.required),
        type: new FormControl(phones.type),
        id: new FormControl(phones.id)
      }));
    }
  }

  private prepareEmails(): void {
    while ((this.editableClient.controls['emails'] as FormArray).length !== 0) {
      (this.editableClient.controls['emails'] as FormArray).removeAt(0)
    }
    for (const emails of this.client.emails) {
      (this.editableClient.controls['emails'] as FormArray).push(new FormGroup({
        owner_name: new FormControl(emails.owner_name, Validators.required),
        address: new FormControl(emails.address, Validators.email),
        type: new FormControl(emails.type),
        id: new FormControl(emails.id)
      }));
    }
  }

  private prepareCustomFields(): void {
    while ((this.editableClient.controls['customfields'] as FormArray).length !== 0) {
      (this.editableClient.controls['customfields'] as FormArray).removeAt(0)
    }
    for (const fields of this.client.customfields) {
      (this.editableClient.controls['customfields'] as FormArray).push(new FormGroup({
        key: new FormControl(fields.key),
        value: new FormControl(fields.value),
        id: new FormControl(fields.id)
      }));
    }
  }

  public changeClientType(event: any){
    const value = event.target ? event.target.value : event;

    if (value === 'fizlico') {
      this.editableClient.controls['fizlico_type'].setValidators([Validators.required]);

      this.editableClient.controls['yurlico_type'].setValidators(null);
      this.editableClient.controls['yurlico_form'].setValidators(null);

    }

    if (value === 'yurlico') {
      this.editableClient.controls['fizlico_type'].setValidators(null);

      this.editableClient.controls['yurlico_type'].setValidators([Validators.required]);
      this.editableClient.controls['yurlico_form'].setValidators([Validators.required]);
    }

    this.editableClient.updateValueAndValidity();

  }

  public deletePhone(index: number) {
    this._clientService.updateClient(this.client.id, {
      phones: [(this.editableClient.controls['phones'] as FormArray).controls[index].value]
    }).subscribe(
      data => {
        this.prepareForm(this._id);
      }
    );
  }

  public deleteEmail(index: number) {
    this._clientService.updateClient(this.client.id, {
      emails: [(this.editableClient.controls['emails'] as FormArray).controls[index].value]
    }).subscribe(
      data => {
        this.prepareForm(this._id);
      }
    );
  }

  public deleteCustomfield(index: number) {
    this._clientService.updateClient(this.client.id, {
      customfields: [(this.editableClient.controls['customfields'] as FormArray).controls[index].value]
    }).subscribe(
      data => {
        this.prepareForm(this._id);
      }
    );
  }

  public addPhone(): void {
    (this.editableClient.controls['phones'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      type: new FormControl(this.type_phones[0].type)
    }));
  }

  public addEmail(): void {
    (this.editableClient.controls['emails'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.email),
      type: new FormControl(this.type_emails[0].type)
    }));
  }

  public addCustomfield(): void {
    (this.editableClient.controls['customfields'] as FormArray).push(new FormGroup({
      key: new FormControl(),
      value: new FormControl()
    }));
  }

  public openSelectParentComponent(company: string) {
    if(this.parentClient) {
      this.parentClient = null;
    } else {
      this.clientSelectComponent.getClientParent(company);
      this.modalStandard.showModal();
    }
  }

  public setParentClient(parentClient: ClientModel) {
    this.modalStandard.hideModal();
    this.editableClient.controls['parent'].setValue(parentClient.id);
    this.parentClient = parentClient;
  }

  public returnMainPage() {
    this._router.navigate(['contacts/main/' + this._id]);
  }

  private checkEditablePhones(): any {

    const phones: Array<any> = [];

    for(let phone of (this.editableClient.controls['phones'] as FormArray).controls){
      if (phone.value.id){
        const searchPhone = this.client.phones.find(x => x.id === phone.value.id);

        console.log(phone,searchPhone);

        if (searchPhone.number != phone.value.number ||
          searchPhone.type != phone.value.type ||
          searchPhone.owner_name != phone.value.owner_name) {
          phones.push(phone.value)
        }
        else {
          continue;
        }
      } else {
        phones.push(phone.value)
      }
    }

    return phones;
  }

  private checkEditableEmails(): any {

    const emails: Array<any> = [];

    for(let email of (this.editableClient.controls['emails'] as FormArray).controls){
      if (email.value.id){
        const searchEmail = this.client.emails.find(x => x.id === email.value.id);

        if (searchEmail.address != email.value.address ||
          searchEmail.type != email.value.type ||
          searchEmail.owner_name != email.value.owner_name) {
          emails.push(email.value)
        }
        else {
          continue;
        }
      } else {
        emails.push(email.value)
      }
    }

    return emails;
  }

  private checkEditableCustomFields(): any {

    const customfields: Array<any> = [];

    for(let field of (this.editableClient.controls['customfields'] as FormArray).controls){
      if (field.value.id){
        const searchField = this.client.customfields.find(x => x.id === field.value.id);

        if(searchField.key != field.value.key || searchField.value != field.value.value){
          customfields.push(field.value)
        }
        else {
          continue;
        }
      } else {
        customfields.push(field.value)
      }
    }

    return customfields;
  }

  public editClient() {

    let editClient = this.editableClient.value;

    editClient.phones = this.checkEditablePhones();
    editClient.emails = this.checkEditableEmails();
    editClient.customfields = this.checkEditableCustomFields();

    this._clientService.updateClient(this.client.id, editClient).subscribe(
      data => {
        this._clientRepository.getContactsLight({
          company_title: this.editableClient.controls['company'].value
        });
        this._notificationService.sendNotification({
          title: 'Клиент обновлен'
        });
        this._router.navigate(['contacts/main/' + this._id]);
      },
      err => console.log(err)
    )
  }
}
