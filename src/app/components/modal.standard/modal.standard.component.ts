import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-standard',
  templateUrl: './modal.standard.component.html',
  styleUrls: ['./modal.standard.component.css']
})
export class ModalStandardComponent implements OnInit {

  @Input() title: string;
  private isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public showModal() {
    this.isVisible = true;
  }

  public hideModal() {
    this.isVisible = false;
  }

  public toggleModal() {
    this.isVisible = !this.isVisible;
  }
}
