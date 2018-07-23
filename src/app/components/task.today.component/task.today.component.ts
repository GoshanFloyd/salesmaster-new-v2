import {Component, OnInit, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/task.model';
import {UserModel} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {NotificationService} from '../../services/notification.service';
import {TaskDeadlineComponent} from '../task.deadline.component/task.deadline.component';

@Component({
  moduleId: module.id,
  templateUrl: './task.today.component.html',
  selector: 'app-task-today'
})

export class TaskTodayComponent implements OnInit {

  @ViewChild('modalDoneTask') public modalDoneTask: ModalStandardComponent;
  @ViewChild('taskDeadlineModal') public taskDeadlineModal: TaskDeadlineComponent;

  public currentTask: TaskModel = null;

  public formDoneTask: FormGroup = new FormGroup({
    result: new FormControl(null, Validators.required)
  });

  private _taskList: Array<TaskModel> = [];

  public deadlineTask: TaskModel = null;

  public userSort: number = null;
  public statusSort: string = null;

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService,
               private _notificationService: NotificationService) {}

  ngOnInit() {
    this.getTodayTask();
  }

  get todayDate(): string {
    return new Date().toISOString().match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)[0];
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  get taskList(): Array<TaskModel> {

    let tasksSortList = this._taskList.filter(x => x.status != 'done')

    if(this.userSort){
      if(this.userSort == 1) {
        tasksSortList = tasksSortList.filter(x => x.employee_doer.id == this.user.id)
      }
      if(this.userSort == 2) {
        tasksSortList = tasksSortList.filter(x => x.employee_owner.id == this.user.id)
      }
    }

    if(this.statusSort){
      tasksSortList = tasksSortList.filter(x => x.status == this.statusSort);
    }

    return tasksSortList.sort((a,b) => {
      return b.datetime_created.getTime() - a.datetime_created.getTime();
    });
  }

  public getTodayTask(): void {
    this._taskService.getTasks({
      'deadline_in_0': this.todayDate,
      'deadline_in_1': this.todayDate,
      'both_id': this.user.id
    }).subscribe(
      data => {
        this._taskList = TaskModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  public openDoneTaskModal(task: TaskModel): void {
    this.currentTask = task;
    this.modalDoneTask.showModal();
  }

  public doneTask(): void {
    let task = {};

    if (this.currentTask.employee_owner.id === this.user.id) {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'completed'
      };
    } else {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'verifying'
      };
    }

    this._taskService.updateTask(this.currentTask.id, task).subscribe(
      data => {
        if (this.currentTask.employee_owner.id === this.user.id) {
          this._notificationService.sendNotification({
            title: 'Задача была выполнена'
          });
        } else {
          this._notificationService.sendNotification({
            title: `Задача отправлена на проверку ${this.currentTask.employee_owner.fullname}`
          });
        }
        this.modalDoneTask.hideModal();
        this.getTodayTask();
      },
      err => console.log(err)
    );
  }

  public verifyTask(task: TaskModel): void {
    this._taskService.updateTask(task.id,{
      'status': 'completed'
    }).subscribe(
      data => {
        this.getTodayTask();
        this._notificationService.sendNotification({
          title: 'Вы одобрили задачу'
        });
      },
      err => console.log(err)
    )
  }

  public openDeadlineModal(task: TaskModel) {
    this.deadlineTask = task;
    this.taskDeadlineModal.showDeadlineModal();
  }

  public updateAfterNewDeadline(event: boolean) {
    if (event) {
      this.getTodayTask();
    }
  }
}
