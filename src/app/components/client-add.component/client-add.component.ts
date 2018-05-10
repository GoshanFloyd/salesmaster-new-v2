import {Component, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRepository} from '../../repositories/user.repository';
import {FORMS_YURLICO, TYPE_EMAIL, TYPE_FIZLICO, TYPE_PHONE, TYPE_YURLICO} from '../../variables/variables';
import {UserModel} from '../../models/user.model';
import {ClientModel} from '../../models/client.model';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ClientSelectComponent} from '../client.select.component/client.select.component';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './client-add.component.html',
  host: { class: 'grid-row' }
})


export class ClientAddComponent {

  @ViewChild(ClientSelectComponent) private clientSelectComponent: ClientSelectComponent;
  @ViewChild(ModalStandardComponent) private modalStandard: ModalStandardComponent;

  public readonly types_fizlico = TYPE_FIZLICO;
  public readonly types_yurlico = TYPE_YURLICO;
  public readonly forms_yurlico = FORMS_YURLICO;
  public readonly type_phones = TYPE_PHONE;
  public readonly type_emails = TYPE_EMAIL;

  public newClient: FormGroup;

  private parentClient: ClientModel = null;

  constructor( private _userRepository: UserRepository,
               private _clientRepository: ClientsRepository,
               private _router: Router,
               private _notificationService: NotificationService) {
    this.newClient = new FormGroup({
      title: new FormControl('', Validators.required),
      company: new FormControl(this.user.company[0].title, Validators.required),
      parent: new FormControl(null),
      employee: new FormControl(this.user.id),
      type: new FormControl('fizlico', Validators.required),
      street: new FormControl(null),
      postcode: new FormControl(null),
      requisite: new FormControl(null),
      fizlico_type: new FormControl(null, Validators.required),
      yurlico_type: new FormControl(null, ),
      yurlico_form: new FormControl(null, ),
      customfields: new FormArray([]),
      phones: new FormArray([]),
      emails: new FormArray([])
    });
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  public changeClientType(event: any) {
    const value = event.target.value;

    if (value === 'fizlico') {

      console.log('Fiz');

      this.newClient.controls['fizlico_type'].setValidators([Validators.required]);

      this.newClient.controls['yurlico_type'].setValidators(null);
      this.newClient.controls['yurlico_form'].setValidators(null);

    }

    if (value === 'yurlico') {

      console.log('Yur');

      this.newClient.controls['fizlico_type'].setValidators(null);

      this.newClient.controls['yurlico_type'].setValidators([Validators.required]);
      this.newClient.controls['yurlico_form'].setValidators([Validators.required]);
    }

    this.newClient.updateValueAndValidity();

    console.log(this.newClient);
  }


  public addPhone(): void {

    (this.newClient.controls['phones'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      type: new FormControl(this.type_phones[0].type)
    }));
  }

  public deletePhone(index: number): void {
    (this.newClient.controls['phones'] as FormArray).removeAt(index);
  }

  public addEmail(): void {
    (this.newClient.controls['emails'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.email),
      type: new FormControl(this.type_emails[0].type)
    }));
  }

  public deleteEmail(index: number): void {
    (this.newClient.controls['emails'] as FormArray).removeAt(index);
  }

  public addCustomfield(): void {
    (this.newClient.controls['customfields'] as FormArray).push(new FormGroup({
      key: new FormControl(),
      value: new FormControl()
    }));
  }

  public deleteCustomfield(index: number): void {
    (this.newClient.controls['customfields'] as FormArray).removeAt(index);
  }

  public createClient() {
    this._clientRepository.createClient(this.newClient.value).subscribe(
      data => {
        this._clientRepository.getContactsLight({
          company_title: this.newClient.controls['company'].value
        });
        this._router.navigate(['/contacts/main']);
        this._notificationService.sendNotification('Добавлен клиент',
          `Добавлен клиент с наименованием ${this.newClient.controls['title'].value}`);
      },
      err => console.log(err)
    );
  }

  get company() {
    return this.newClient.controls.company.value;
  }

  public openSelectParentComponent(company: string) {
    if (this.parentClient) {
      this.parentClient = null;
    } else {
      this.clientSelectComponent.getClientParent(company);
      this.modalStandard.showModal();
    }
  }

  public setParentClient(parentClient: ClientModel) {
    this.modalStandard.hideModal();
    this.newClient.controls['parent'].setValue(parentClient.id);
    this.parentClient = parentClient;
  }

  public returnMainPage() {
    this._router.navigate(['/contacts/main']);
  }
}
