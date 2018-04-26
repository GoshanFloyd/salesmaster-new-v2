import {UserRepository} from '../../repositories/user.repository';
import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TASKS_PRIORITY, TASKS_STATUS} from '../../variables/variables';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: './task.add.component.html',
  selector: 'app-task-add'
})

export class TaskAddComponent {

  public usersList: Array<UserModel> = [];

  public isMyTask: boolean = false;

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
    status: new FormControl('in_process', Validators.required),
    datetime_deadline: new FormControl(null, Validators.required)
  });

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService,
               private _userService: UserService) {}


  public init() {
    this.getUsers();
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
        console.log(data);
        this.usersList = UserModel.fromArray(data);
      },
      err => console.log(err)
    )
  }
}
