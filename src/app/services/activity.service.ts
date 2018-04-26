import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivityModel} from '../models/activity.model';

@Injectable()
export class ActivityService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getActivities(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ActivityModel[]>(`${this.baseProtocol}${this.baseURL}activities`, {
      params: obj ? obj : null,
      headers: header
    });
  }

  public createActivity(obj?: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<ActivityModel>(`${this.baseProtocol}${this.baseURL}activities`, obj, {
      headers: header
    });
  }

  public updateActivity(id: number, obj: any) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}activities/${id}`, obj, {
      headers: header
    })
  }
}
