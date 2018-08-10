import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivityTypeModel} from '../models/acitivitytype.model';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()
export class ActivityTypeService {

  constructor (private _httpClient: HttpClient) {}

  public getActivitiesTypes(obj?: any) {
    const headers = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.get<ActivityTypeModel[]>(`${UrlSettings.getBackendUrl()}activity_types`, {
      params: obj ? obj : null,
      headers: headers
    });
  }
}
