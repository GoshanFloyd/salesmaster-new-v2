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
  public formAddCommentEnabled: boolean = false;

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
    this.formAddCommentEnabled = true;

    const newComment = {
      'text': this.formAddComment.controls['text'].value,
      'employee': this.user.id
    }

    this._taskService.updateTask(this.currentTask.id, {
      comments: [newComment]
    }).subscribe(
      data => {
        this.currentTask = new TaskModel(data);
        this.addCommentModal.hideModal();
      },
      err => {
        console.log(err);
      },
      () => {
        this.formAddCommentEnabled = false;
      }
    )
  }

  public updateEditableComments() {
    this._taskService.getTask(this.currentTask.id).subscribe(
      data => {
        this.currentTask = new TaskModel(data);
      },
      err => console.log(err)
    )
  }
}
