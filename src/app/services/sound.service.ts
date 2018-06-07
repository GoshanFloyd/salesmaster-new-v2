import {Injectable} from '@angular/core';

@Injectable()
export class SoundService {

  private _isEnableSound:boolean = true;
  private _sound: any;

  constructor () {}

  get isEnableSound(): boolean {
    return this._isEnableSound;
  }

  public toggleSound(): boolean {
    this._isEnableSound = !this._isEnableSound;
    return this._isEnableSound;
  }

  public setSound(soundPath?: string, soundVolume?: number): void {
    this._sound = new Audio(soundPath ? soundPath : '../../assets/sounds/notify.mp3');
    this._sound.volume = soundVolume ? soundVolume : 0.4;
  }

  public playSound(): void {
    if (this._isEnableSound) {
      this._sound.play();
    } else {
      return;
    }
  }
}
