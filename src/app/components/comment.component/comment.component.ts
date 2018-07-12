import {Component, Input} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {IComment} from '../../models/task.model';

@Component({
  moduleId: module.id,
  templateUrl: './comment.component.html',
  selector: 'app-comment'
})

export class CommentComponent {

  @Input() public comment: IComment;

  constructor(private _taskServise: TaskService) {}

}
