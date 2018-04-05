import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal.StandardComponent } from './modal.standard.component';

describe('Modal.StandardComponent', () => {
  let component: Modal.StandardComponent;
  let fixture: ComponentFixture<Modal.StandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modal.StandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal.StandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
