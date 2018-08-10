import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskModel} from '../models/task.model';
import {UrlSettings} from '../classes/urlSettings';

@Injectable()
export class TaskService {

  constructor (private _httpClient: HttpClient) {}

  public getTasks(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<TaskModel[]>(`${UrlSettings.getBackendUrl()}tasks`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public getTask(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<TaskModel>(`${UrlSettings.getBackendUrl()}tasks/${id}`, {
      headers: header
    });
  }

  public createTask(obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<any>(`${UrlSettings.getBackendUrl()}tasks`, obj, {
      headers: header
    });
  }

  public updateTask(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${UrlSettings.getBackendUrl()}tasks/${id}`, obj, {
      headers: header
    });
  }

  public deleteTask(id: number) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.delete<any>(`${UrlSettings.getBackendUrl()}tasks/${id}`, {
      headers: header
    });
  }
}
