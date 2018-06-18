import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-standard',
  templateUrl: './modal.standard.component.html',
  styleUrls: ['./modal.standard.component.css']
})
export class ModalStandardComponent implements OnInit {

  @Input() title: string;
  private _isVisible: boolean = false;

  private _percentLoad: number = 0;

  constructor() { }

  ngOnInit() {
  }

  public showModal() {
    this._isVisible = true;
  }

  public hideModal() {
    this._isVisible = false;
  }

  public toggleModal() {
    this._isVisible = !this._isVisible;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  get percentLoad(): number {
    return this._percentLoad;
  }

  set percentLoad(percent: number) {
    this._percentLoad = percent;
  }
}
