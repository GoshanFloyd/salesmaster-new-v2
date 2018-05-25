import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/task.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from 'protractor/built/taskScheduler';

@Component({
  moduleId: module.id,
  templateUrl: './task.single.component.html',
  host: { class: 'grid-row' }
})

export class TaskSingleComponent implements OnInit{

  private _currentTask: TaskModel = null;
  public formDoneTask: FormGroup = new FormGroup({
    result: new FormControl(null, Validators.required)
  });

  @ViewChild('modalDoneTask') private modalDoneTask: ModalStandardComponent;

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService,
               private _activateRoute: ActivatedRoute,
               private _notificationService: NotificationService,
               private _router: Router,
               private _appRef: ApplicationRef) {

    this._router.events.subscribe(
      data => {
        if(data instanceof NavigationEnd) {
          if(this.currentTask && this._activateRoute.snapshot.params['id'] != this.currentTask.id.toString()) {
            this.getTask();
          }
        }
      }
    )
  }

  get currentTask(): TaskModel {
    return this._currentTask;
  }

  ngOnInit() {
    this.getTask();
  }

  private getTask() {
    this._taskService.getTask(this._activateRoute.snapshot.params['id']).subscribe(
      data => {
        this._currentTask = new TaskModel(data);
        this._appRef.tick();
      },
      err => console.log(err)
    );
  }

  get user() {
    return this._userRepository.getMyUser();
  }

  public deleteTask() {
    if (this._currentTask.employee_owner.id === this.user.id) {
      this._taskService.deleteTask(this._currentTask.id).subscribe(
        data => {
          this._notificationService.sendNotification({
            title: 'Задача удалена'
          });
          this._router.navigate(['/tasks/main']);
        },
        err => console.log(err)
      );
    } else {
      this._notificationService.sendNotification({
        title: 'Данную задачу удалить нельзя'
      });
    }
  }

  public approveTask() {
    if (this._currentTask.employee_owner.id === this.user.id) {
      this._taskService.updateTask(this._currentTask.id, {
        'status': 'done'
      }).subscribe(
        data => {
          this._notificationService.sendNotification({
            title: 'Задача одобрена'
          });
          this.getTask();
        },
        err => console.log(err)
      );
    }
  }

  public showModalDoneTask() {
    this.modalDoneTask.showModal();
  }

  public doneTask() {

    let task = {};

    if (this._currentTask.employee_owner.id === this.user.id) {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'done'
      };
    } else {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'verifying'
      };
    }

    this._taskService.updateTask(this._currentTask.id, task).subscribe(
      data => {
        if (this._currentTask.employee_owner.id === this.user.id) {
          this._notificationService.sendNotification({
            title: 'Задача была выполнена'
          });
        } else {
          this._notificationService.sendNotification({
            title: `Задача отправлена на проверку ${this._currentTask.employee_owner.fullname}`
          });
        }
        this.modalDoneTask.hideModal();
        this.getTask();
      },
      err => console.log(err)
    );
  }
}
