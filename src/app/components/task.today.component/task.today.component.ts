import {Component, OnInit} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {TaskService} from '../../services/task.service';
import {TaskModel} from '../../models/task.model';
import {UserModel} from '../../models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: './task.today.component.html',
  selector: 'app-task-today'
})

export class TaskTodayComponent implements OnInit{

  private _taskList: Array<TaskModel> = [];

  public userSort: number = null;
  public statusSort: string = null;

  constructor (private _userRepository: UserRepository,
               private _taskService: TaskService ) {}

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

   public getTodayTask() {
    this._taskService.getTasks({
      'deadline_in_0': this.todayDate,
      'deadline_in_1': this.todayDate,
      'both_id': this.user.id
    }).subscribe(
      data => {
        this._taskList = TaskModel.fromArray(data)
      },
      err => console.log(err)
    )
   }
}
