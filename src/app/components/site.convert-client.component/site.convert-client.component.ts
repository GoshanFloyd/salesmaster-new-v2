import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ColdClientService} from '../../services/cold.client.service';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CLIENT_TYPE, FORMS_YURLICO, TYPE_FIZLICO, TYPE_YURLICO} from '../../variables/variables';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: './site.convert-client.component.html',
  selector: 'app-site-convert-client'
})

export class SiteConvertClientComponent {

  @ViewChild('modalSiteConvertClient') private modalSiteConvertClient: ModalStandardComponent;

  @Input() coldClientID: number;

  @Output('onConvertColdClient') onConvertColdClient = new EventEmitter<boolean>();

  public readonly clientsTypes = CLIENT_TYPE;
  public readonly clientsFizLicoTypes = TYPE_FIZLICO;
  public readonly clientsYurLicoType = TYPE_YURLICO;
  public readonly clientsYurLicoForms = FORMS_YURLICO;

  public formConvertClient: FormGroup;

  constructor(private _coldClientService: ColdClientService,
              private _router: Router) {
    this.formConvertClient = new FormGroup({
      type: new FormControl(null, Validators.required),
      fizlico_type: new FormControl(null),
      yurlico_type: new FormControl(null),
      yurlico_form: new FormControl(null)
    });
  }

  public openModal() {
    this.modalSiteConvertClient.showModal();
  }

  public changeTypeClient(event: any) {
    if (this.formConvertClient.controls['type'].value === 'fizlico') {
      this.formConvertClient.controls['fizlico_type'].setValidators([Validators.required]);

      this.formConvertClient.controls['yurlico_type'].setValidators([]);
      this.formConvertClient.controls['yurlico_form'].setValidators([]);
    }
    if (this.formConvertClient.controls['type'].value === 'yurlico') {
      this.formConvertClient.controls['fizlico_type'].setValidators([]);

      this.formConvertClient.controls['yurlico_type'].setValidators([Validators.required]);
      this.formConvertClient.controls['yurlico_form'].setValidators([Validators.required]);
    }

    this.formConvertClient.updateValueAndValidity();
  }

  public convertClient(event: Event) {
    this._coldClientService.convertColdClient(this.coldClientID, this.formConvertClient.value).subscribe(
      data => {
        this.onConvertColdClient.emit(true);
        this.modalSiteConvertClient.hideModal();
        this.formConvertClient = new FormGroup({
          type: new FormControl(null, Validators.required),
          fizlico_type: new FormControl(null),
          yurlico_type: new FormControl(null),
          yurlico_form: new FormControl(null)
        });

        if (confirm('Хотите перейти на страницу созданного клиента?')) {
          this._router.navigateByUrl(`/contacts/main/${data.id}`);
        }
      },
      err => console.log(err)
    );
  }
}
