import {Component, ViewChild} from '@angular/core';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {AdminMessageService} from '../../services/admin.message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface IAdminMessage {
  subject: string;
  message: string;
}

@Component({
  moduleId: module.id,
  templateUrl: './admin.message.component.html',
  selector:  'app-admin-message'
})

export class AdminMessageComponent {

  @ViewChild('adminMessageModal') private adminMessageModal: ModalStandardComponent;

  public formAdminMessage: FormGroup;

  constructor(private _adminMessageService: AdminMessageService) {
    this.formAdminMessage = new FormGroup({
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  public showModal(): void {
    this.adminMessageModal.showModal();
  }

  public sendAdminMessage(event: Event) {
    event.preventDefault();

    this._adminMessageService.sendAdminMessage(this.formAdminMessage.value as IAdminMessage).subscribe(
      data => {
        this.adminMessageModal.hideModal();
        this.formAdminMessage.reset();
      },
      err => console.log(err)
    );
  }
}
