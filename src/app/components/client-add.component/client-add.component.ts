import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRepository} from '../../repositories/user.repository';
import {FORMS_YURLICO, TYPE_EMAIL, TYPE_FIZLICO, TYPE_PHONE, TYPE_YURLICO} from '../../variables/variables';

@Component({
  moduleId: module.id,
  templateUrl: './client-add.component.html',
  host: { class: 'grid-row' }
})

export class ClientAddComponent {

  public readonly types_fizlico = TYPE_FIZLICO;
  public readonly types_yurlico = TYPE_YURLICO;
  public readonly forms_yurlico = FORMS_YURLICO;
  public readonly type_phones = TYPE_PHONE;
  public readonly type_emails = TYPE_EMAIL;

  public newClient: FormGroup;

  constructor( private _userRepository: UserRepository ) {
    this.newClient = new FormGroup({
      title: new FormControl('', Validators.required),
      company: new FormControl('null', Validators.required),
      parent: new FormControl(null),
      employee: new FormControl(this.user.id),
      type: new FormControl('fizlico', Validators.required),
      street: new FormControl(''),
      postcode: new FormControl(''),
      requisite: new FormControl(''),
      fizlico_type: new FormControl('null', ),
      yurlico_type: new FormControl('null', ),
      yurlico_form: new FormControl('null', ),
      customfields: new FormArray([

      ]),
      phones: new FormArray([]),
      emails: new FormArray([])
    });
  }

  get user() {
    return this._userRepository.getMyUser();
  }

  public addPhone() {

    (this.newClient.controls['phones'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(),
      number: new FormControl(),
      type: new FormControl(this.type_phones[0].type)
    }));
  }

  public deletePhone(index: number) {
    (this.newClient.controls['phones'] as FormArray).removeAt(index)
  }

  public addEmail() {
    (this.newClient.controls['emails'] as FormArray).push(new FormGroup({
      owner_name: new FormControl(),
      address: new FormControl(),
      type: new FormControl(this.type_emails[0].type)
    }));
  }

  public deleteEmail(index: number) {
    (this.newClient.controls['emails'] as FormArray).removeAt(index)
  }

  public createClient(obj: any) {
  }

}
