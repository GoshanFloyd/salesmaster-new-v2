import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-standard',
  templateUrl: './modal.standard.component.html',
  styleUrls: ['./modal.standard.component.css']
})
export class ModalStandardComponent implements OnInit {

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
