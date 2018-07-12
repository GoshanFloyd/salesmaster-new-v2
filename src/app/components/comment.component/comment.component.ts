import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {IComment, TaskModel} from '../../models/task.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './comment.component.html',
  selector: 'app-comment'
})

export class CommentComponent {

  @Input() public comment: IComment;
  @Input() public ownerID: number;
  @Input() public taskID: number;

  @ViewChild('editCommentModal') private editCommentModal: ModalStandardComponent;

  @Output() public onEditComment = new EventEmitter<TaskModel>();

  public editButtonEnable: boolean = false;

  public formEditComment = new FormGroup({
    'text': new FormControl(null, Validators.required)
  });

  constructor(private _taskServise: TaskService,
              private _userRepository: UserRepository) {}

  get user(): UserModel {
    return this._userRepository.user;
  }

  public openEditCommentModal() {
    this.formEditComment.controls['text'].setValue(this.comment.text);
    this.editCommentModal.showModal();
  }

  public editComment() {
    const editableComment = {
      id: this.comment.id,
      text: this.formEditComment.controls['text'].value
    }

    this.editButtonEnable = true;

    this._taskServise.updateTask(this.taskID, {
      comments: [editableComment]
    }).subscribe(
      data => {
        this.onEditComment.emit(new TaskModel(data));
        this.editCommentModal.hideModal();
      },
      err => {
        console.log(err);
      },
      () => this.editButtonEnable = false
  )
  }
}
