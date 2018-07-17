import {UserRepository} from '../../repositories/user.repository';
import {Component, EventEmitter, Output} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TASKS_PRIORITY, TASKS_STATUS} from '../../variables/variables';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';

@Component({
  moduleId: module.id,
  templateUrl: './task.add.component.html',
  selector: 'app-task-add'
})

export class TaskAddComponent {

  @Output() onCreate = new EventEmitter<any>();

  public usersList: Array<UserModel> = [];

  public isMyTask: boolean = false;

  public ruLocale: any = DATEPICKER_RU_LOCALE;

  public readonly tasksPriority: Array<{
    type: string,
    value: string
  }> = TASKS_PRIORITY;

  public readonly tasksStatus: Array<{
    type: string,
    value: string
  }> = TASKS_STATUS;

  public _formNewTask: FormGroup = new FormGroup({
    employee_owner: new FormControl(this._userRepository.getMyUser().id),
    employee_doer: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    priority: new FormControl('middle', Validators.required),
    status: new FormControl('in_progress'),
    datetime_deadline: new FormControl(null, Validators.required)
  });

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService,
               private _userService: UserService) {}


  public init() {
    this.getUsers();
  }

  public setDeadline(date: Date) {
    this._formNewTask.controls['datetime_deadline'].setValue(date);
  }

  public onChangeDoer(event: Event) {
    this.isMyTask = !this.isMyTask;
    if (this.isMyTask) {
      this._formNewTask.controls['employee_doer'].disable();
      this._formNewTask.controls['employee_doer'].setValue(this._userRepository.getMyUser().id);
    } else {
      this._formNewTask.controls['employee_doer'].enable();
      this._formNewTask.controls['employee_doer'].setValue(null);
    }
  }

  private getUsers(): void {
    this._userService.getUsers().subscribe(
      data => {
        this.usersList = UserModel.fromArray(data);
      },
      err => console.log(err)
    );
  }

  private getDeadlineDate(date: string): string {
    const dateObj = new Date(date);

    const pad = (number) => {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    };

    return dateObj.getFullYear() +
      '-' + pad(dateObj.getMonth() + 1) +
      '-' + pad(dateObj.getDate()) +
      'T' + pad(dateObj.getHours()) +
      ':' + pad(dateObj.getMinutes()) +
      ':' + pad(dateObj.getSeconds()) +
      '.' + (dateObj.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z';
  }

  private clearForm() {
    this._formNewTask.controls.employee_doer.setValue(null);
    this._formNewTask.controls.title.setValue(null);
    this._formNewTask.controls.description.setValue(null);
    this._formNewTask.controls.priority.setValue('middle');
    this._formNewTask.controls.status.setValue('in_progress');
    this._formNewTask.controls.datetime_deadline.setValue(null);
  }

  public addTask(event: Event) {

    event.preventDefault();

    const task = {
      'employee_owner': this._formNewTask.controls['employee_owner'].value,
      'employee_doer': this._formNewTask.controls['employee_doer'].value,
      'client': null,
      'title': this._formNewTask.controls['title'].value,
      'description': this._formNewTask.controls['description'].value,
      'priority': this._formNewTask.controls['priority'].value,
      'status': this._formNewTask.controls['status'].value,
      'datetime_deadline': this.getDeadlineDate(this._formNewTask.controls['datetime_deadline'].value)
    };

    this._taskService.createTask(task).subscribe(
      data => {
        this._formNewTask = new FormGroup({
          employee_owner: new FormControl(this._userRepository.getMyUser().id),
          employee_doer: new FormControl(null, Validators.required),
          title: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required),
          priority: new FormControl('middle', Validators.required),
          status: new FormControl('in_progress'),
          datetime_deadline: new FormControl(null, Validators.required)
        });
        this.onCreate.emit(true);
      },
      err => console.log(err)
    );
  }
}
