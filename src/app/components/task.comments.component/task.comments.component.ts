import {Component, Input} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/task.model';

@Component({
  moduleId: module.id,
  templateUrl: './task.comments.component.html',
  selector: 'app-task-comments'
})

export class TaskCommentsComponent {

  @Input() public currentTask: TaskModel;

  constructor (_taskService: TaskService) {}
}
