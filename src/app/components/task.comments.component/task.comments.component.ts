import {Component, Input, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {IComment, TaskModel} from '../../models/task.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';

@Component({
  moduleId: module.id,
  templateUrl: './task.comments.component.html',
  selector: 'app-task-comments',
})

export class TaskCommentsComponent {

  @Input() public currentTask: TaskModel;

  @ViewChild('addCommentModal') private addCommentModal: ModalStandardComponent;

  public formAddComment = new FormGroup({
    'text': new FormControl(null, Validators.required)
  })

  constructor (private _taskService: TaskService,
               private _userRepository: UserRepository) {}

  get user(): UserModel {
    return this._userRepository.user;
  }

  get comments(): Array<IComment> {
    return this.currentTask && this.currentTask.comments ? this.currentTask.comments : [];
  }

  public openAddCommentModal(event: Event) {
    event.preventDefault();
    this.addCommentModal.showModal();
  }

  public addComment() {

  }
}
