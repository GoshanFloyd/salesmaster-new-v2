import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAdminMessage} from '../components/admin.message.component/admin.message.component';

@Injectable()

export class AdminMessageService {
  private readonly baseProtocol = 'https://';
  private readonly baseURL = 'test.salesmaster.me/api/v1/';

  constructor (private _httpClient: HttpClient) { }

  public sendAdminMessage(obj: IAdminMessage) {

    const header = new HttpHeaders({
      'Authorization': `jwt ${localStorage.getItem('auth_token_salesmaster')}`
    });

    return this._httpClient.post<any>(`${this.baseProtocol}${this.baseURL}admins`,  obj, {headers: header},
    );
  }
}
