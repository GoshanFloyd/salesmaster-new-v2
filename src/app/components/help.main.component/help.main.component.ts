import {Component, HostBinding} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './help.main.component.html',
  selector: 'app-help-main',
  styleUrls: [
    './help.main.component.css'
  ]
})

export class HelpMainComponent {

  @HostBinding('class') private classList = 'col-sm-1 col-md-1 col-lg-1';

  constructor () {}
}
