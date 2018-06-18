import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskModel} from '../models/task.model';

@Injectable()
export class TaskService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getTasks(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<TaskModel[]>(`${this.baseProtocol}${this.baseURL}tasks`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getTask(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<TaskModel>(`${this.baseProtocol}${this.baseURL}tasks/${id}`, {
      headers: header
    });
  }

  public createTask(obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<any>(`${this.baseProtocol}${this.baseURL}tasks`, obj, {
      headers: header
    });
  }

  public updateTask(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}tasks/${id}`, obj, {
      headers: header
    });
  }

  public deleteTask(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.delete<any>(`${this.baseProtocol}${this.baseURL}tasks/${id}`, {
      headers: header
    });
  }
}
