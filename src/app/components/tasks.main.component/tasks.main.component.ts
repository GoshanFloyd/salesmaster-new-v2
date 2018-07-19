import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {NotificationService} from '../../services/notification.service';
import {UserRepository} from '../../repositories/user.repository';
import {TaskModel} from '../../models/task.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {Router} from '@angular/router';
import {TaskAddComponent} from '../task.add.component/task.add.component';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';

declare const $: any;
declare const fullCalendar: any;

type EventType = {
  id: number,
  title: string,
  start: Date,
  end: Date,
  backgroundColor: string,
  className: string
};

@Component({
  moduleId: module.id,
  templateUrl: './tasks.main.component.html',
  host: { class: 'grid-row' }
})

export class TasksMainComponent implements OnInit {

  @ViewChild('modalCreateTask') private modalCreateTask: ModalStandardComponent;
  @ViewChild('taskAddComponent') private taskAddComponent: TaskAddComponent;

  private _tasks: Array<TaskModel> = [];
  private _events: Array<EventType> = [];
  private _users: Array<UserModel> = [];

  public currentUserID: number = this._userRepository.user.id;
  public currentCompanyID: number = this._userRepository.user.getDefaultCompany().id;

  constructor (private _userRepository: UserRepository,
               private _userService: UserService,
               private _taskService: TaskService,
               private _notificationService: NotificationService,
               private _router: Router) {
  }

  ngOnInit() {
    this.initCalendar();
    if (this.user.type !== 'manager') {
      this.getUsers();
    }
    this.getTasks(this.currentUserID);
  }

  get user(): UserModel {
    return this._userRepository.user;
  }

  get users(): Array<UserModel> {

    const arr: Array<UserModel> = this._users.filter(x => {
      return x.company.find(y => y.id == this.currentCompanyID) ? true : false
    });

    return arr;
  }

  private getUsers(): void {
    this._userService.getUsers().subscribe(
      data => {
        this._users = UserModel.fromArray(data);
      },
      err => console.log(err)
    )
  }

  private getTasks(id: number): void {
    this._taskService.getTasks({
      'both_id': id
    }).subscribe(
      data => {
        this._tasks = TaskModel.fromArray(data);
        this.initData(this._tasks);
        this.reloadCalendar();
      },
      err => console.log(err)
    );
  }

  private initData(tasks: Array<TaskModel>): void {

    this._events = [];

    for (const task of tasks) {
      this._events.push({
        id: task.id,
        title: task.title,
        start: task.datetime_deadline,
        end: task.datetime_deadline,
        backgroundColor: '',
        className: `task_${task.status}`
      });
    }
  }

  private showCreateModal(): void {
    this.modalCreateTask.showModal();
  }

  private reloadCalendar(): void {
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', this._events);
    $('#calendar').fullCalendar('rerenderEvents');
  }

  public onCreateTask(value: any) {
    if (value) {
      this.modalCreateTask.hideModal();
      this.getTasks(this._userRepository.getMyUser().id);
    }
  }

  private initCalendar(): void {

    const self = this;

    $('#calendar').fullCalendar({
      height: 650,
      lang: 'ru',
      firstDay: 1,
      timeFormat: 'H:mm',
      titleFormat: 'MMMM D YYYY',
      events: self._events,
      customButtons: {
        onlyMyDoerTasks: {
          text: 'Где исполнитель',
          click: function() {
            self.initData(self._tasks.filter(x => x.employee_doer.id === self.currentUserID));
            self.reloadCalendar();
          }
        },
        onlyMyOwnerTasks: {
          text: 'Где автор',
          click: function() {
            self.initData(self._tasks.filter(x => x.employee_owner.id === self.currentUserID));
            self.reloadCalendar();
          }
        },
        onlyMyTasks: {
          text: 'Все задачи',
          click: function() {
            self.initData(self._tasks);
            self.reloadCalendar();
          }
        }
      },
      header: {
        left: 'prev,next,today onlyMyDoerTasks,onlyMyOwnerTasks,onlyMyTasks',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      eventClick: function(calEvent: any, jsEvent: any, view: any) {
        self._router.navigate(['/tasks/main/' + calEvent.id]);
      },
      dayClick: function(date, jsEvent, view) {

        const oldDate = new Date();

        const newDate = new Date(date.format());
        newDate.setHours(oldDate.getHours() + 2);
        newDate.setMinutes(oldDate.getMinutes());

        self.taskAddComponent.setDeadline(newDate);
        self.showCreateModal();
        self.taskAddComponent.init();
      }
    });
  }

  public setCurrentUser(id: number) {
    this.getTasks(id);
  }
}
