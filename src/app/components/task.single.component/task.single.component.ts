import {Component, OnInit, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/task.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: './task.single.component.html',
  host: { class: 'grid-row' }
})

export class TaskSingleComponent implements OnInit{

  public currentTask: TaskModel = null;
  public formDoneTask: FormGroup = new FormGroup({
    result: new FormControl(null, Validators.required)
  })

  @ViewChild('modalDoneTask') private modalDoneTask: ModalStandardComponent;

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService,
               private _activateRoute: ActivatedRoute,
               private _notificationService: NotificationService,
               private _router: Router) {}

  ngOnInit() {
    this.getTask();
  }

  private getTask(){
    this._taskService.getTask(this._activateRoute.snapshot.params['id']).subscribe(
      data => {
        this.currentTask = new TaskModel(data);
        console.log(this.currentTask.priority);
      },
      err => console.log(err)
    )
  }

  get user() {
    return this._userRepository.getMyUser();
  }

  public deleteTask(){
    if (this.currentTask.employee_owner.id == this.user.id) {
      this._taskService.deleteTask(this.currentTask.id).subscribe(
        data => {
          this._notificationService.sendNotification('Задача удалена');
          this._router.navigate(['/tasks/main']);
        },
        err => console.log(err)
      )
    } else {
      this._notificationService.sendNotification('Данную задачу удалить нельзя')
    }
  }

  public approveTask() {
    if (this.currentTask.employee_owner.id == this.user.id) {
      this._taskService.updateTask(this.currentTask.id, {
        'status': 'done'
      }).subscribe(
        data => {
          this._notificationService.sendNotification('Задача одобрена');
          this.getTask();
        },
        err => console.log(err)
      )
    }
  }

  public showModalDoneTask() {
    this.modalDoneTask.showModal();
  }

  public doneTask() {

    let task = {};

    if(this.currentTask.employee_owner.id == this.user.id) {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'done'
      }
    } else {
      task = {
        'result': this.formDoneTask.controls['result'].value,
        'status': 'verifying'
      }
    }

    this._taskService.updateTask(this.currentTask.id, task).subscribe(
      data => {
        if (this.currentTask.employee_owner.id == this.user.id) {
          this._notificationService.sendNotification('Задача была выполнена')
        } else {
          this._notificationService.sendNotification(`Задача отправлена на проверку ${this.currentTask.employee_owner.fullname}`)
        }
        this.modalDoneTask.hideModal();
        this.getTask();
      },
      err => console.log(err)
    )
  }
}
