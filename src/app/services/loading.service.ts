import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class LoadingService {

  private _isVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public isVisible: Observable<boolean> = this._isVisible.asObservable();


  constructor () {}

  public hideLoader() {
    this._isVisible.next(false);
  }

  public showLoader() {
    this._isVisible.next(true);
  }
}
