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
    )
  }

  private prepareParentClient(id: number) {
    this.editableClient.controls['parent'].setValue(id);
    this._clientService.getClientById(id).subscribe(
      data => {
        this.parentClient = new ClientModel(data);
      }
    )
  }

  private preparePhones(): void {
    for(let phones of this.client.phones) {
      (this.editableClient.controls['phones'] as FormArray).push(new FormGroup({
        owner_name: new FormControl(phones.owner_name, Validators.required),
        number: new FormControl(phones.number, Validators.required),
        type: new FormControl(phones.type)
      }));
    }
  }

  private prepareEmails(): void {
    for(let emails of this.client.emails) {
      (this.editableClient.controls['emails'] as FormArray).push(new FormGroup({
        owner_name: new FormControl(emails.owner_name, Validators.required),
        address: new FormControl(emails.address, Validators.email),
        type: new FormControl(emails.type)
      }));
    }
  }

  private prepareCustomFields(): void {
    for(let fields of this.client.customfields) {
      (this.editableClient.controls['customfields'] as FormArray).push(new FormGroup({
        key: new FormControl(fields.key),
        value: new FormControl(fields.value)
      }));
    }
  }

  public changeClientType(event: any){
    const value = event.target ? event.target.value : event;

    if (value == 'fizlico') {
      this.editableClient.controls['fizlico_type'].setValidators([Validators.required])

      this.editableClient.controls['yurlico_type'].setValidators(null);
      this.editableClient.controls['yurlico_form'].setValidators(null)

    }

    if (value == 'yurlico') {
      this.editableClient.controls['fizlico_type'].setValidators(null)

      this.editableClient.controls['yurlico_type'].setValidators([Validators.required]);
      this.editableClient.controls['yurlico_form'].setValidators([Validators.required])
    }

    this.editableClient.updateValueAndValidity();

  }

  public deletePhone(index: number) {
    (this.editableClient.controls['phones'] as FormArray).removeAt(index);
  }

  public deleteEmail(index: number) {
    (this.editableClient.controls['emails'] as FormArray).removeAt(index);
  }

  public deleteCustomfield(index: number) {
    (this.editableClient.controls['customfields'] as FormArray).removeAt(index);
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
      this.parentClient = null
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

  public returnMainPage(){
    this._router.navigate(['contacts/main/'+this._id]);
  }

  public editClient() {
    console.log(this.editableClient.value);
    this._clientService.updateClient(this.client.id, this.editableClient.value).subscribe(
      data => {
        this._clientRepository.getContactsLight({
          company_title: this.editableClient.controls['company'].value
        });
        this._notificationService.sendNotification('Клиент обновлен');
        this._router.navigate(['contacts/main/'+this._id]);
      },
      err => console.log(err)
    )
  }
}
