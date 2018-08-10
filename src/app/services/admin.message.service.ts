import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAdminMessage} from '../components/admin.message.component/admin.message.component';
import {UrlSettings} from '../settings/urlSettings';

@Injectable()

export class AdminMessageService {

  constructor (private _httpClient: HttpClient) { }

  public sendAdminMessage(obj: IAdminMessage) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<any>(`${UrlSettings.getBackendUrl()}admins`,  obj, {headers: header},
    );
  }
}
