import {Component, Input} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {IComment} from '../../models/task.model';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './comment.component.html',
  selector: 'app-comment'
})

export class CommentComponent {

  private _authorComment: UserModel;

  @Input() public comment: Array<IComment> = [];

  constructor(private _taskServise: TaskService,
              private _userService: UserService) {}

  get authorComment(): UserModel {
    return this._authorComment;
  }
}
