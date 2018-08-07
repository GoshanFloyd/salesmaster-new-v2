import {Injectable} from '@angular/core';

@Injectable()

export class TaskRepository {

  public currentTaskCompanyID: number = null;
  public currentTaskUserID: number = null;

  constructor() {}
}
