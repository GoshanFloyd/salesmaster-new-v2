import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivityTypeModel} from '../models/acitivitytype.model';

@Injectable()
export class ActivityTypeService {

  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) {}

  public getActivitiesTypes(obj?: any) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ActivityTypeModel[]>(`${this.baseProtocol}${this.baseURL}activity_types`, {
      params: obj ? obj : null,
      headers: headers
    });
  }
}
