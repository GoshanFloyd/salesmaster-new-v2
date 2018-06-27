import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

declare const Offline: any;

@Injectable()
export class OfflineService {

  private _status = new Subject<any>();
  private _cycleMonitoring: any = null;

  constructor () {
    this._cycleMonitoring = this.startOfflineMonitoring();
  }

  private startOfflineMonitoring(): any {
    return setInterval(() => {
      this._status.next(Offline.state);
    }, 1000)
  }

  get status(): Observable<any> {
    return this._status.asObservable();
  }
}
