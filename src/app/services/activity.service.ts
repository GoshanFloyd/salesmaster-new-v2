import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivityModel} from '../models/activity.model';

@Injectable()
export class ActivityService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';
  private header = new HttpHeaders({
    'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
  });


  constructor (private _httpClient: HttpClient) {}

  public getActivities(obj?: any) {
    return this._httpClient.get<ActivityModel[]>(`${this.baseProtocol}${this.baseURL}activities`, {
      params: obj ? obj : null,
      headers: this.header
    });
  }

  public createActivity(obj?: any) {
    return this._httpClient.post<ActivityModel>(`${this.baseProtocol}${this.baseURL}activities`, obj, {
      headers: this.header
    });
  }

  public updateActivity(id: number, obj: any) {
    return this._httpClient.patch<any>(`${this.baseProtocol}${this.baseURL}activities/${id}`, obj, {
      headers: this.header
    })
  }
}
