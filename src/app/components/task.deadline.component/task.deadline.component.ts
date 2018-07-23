import {Component, ViewChild} from '@angular/core';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';

@Component({
  moduleId: module.id,
  templateUrl: './task.deadline.component.html',
  selector: 'app-task-deadline'
})

export class TaskDeadlineComponent {

  @ViewChild('taskDeadlineModal') private taskDeadlineModal: ModalStandardComponent;

  constructor () {}
}
