import {AfterViewChecked, Component, ViewChild} from '@angular/core';
import {DealsKanbanComponent} from '../deals-kanban.component/deals-kanban.component';

@Component({
  moduleId: module.id,
  templateUrl: './desktop.component.html',
  host: { class: 'grid-row' }

})

export class DesktopComponent implements AfterViewChecked{

  @ViewChild('kanban') private dealsKanbanComponent: DealsKanbanComponent;

  constructor () {}

  private init() {
    this.dealsKanbanComponent.initKanban(0,0,'desktop');
  }

  ngAfterViewChecked() {
    this.init();
  }
}
