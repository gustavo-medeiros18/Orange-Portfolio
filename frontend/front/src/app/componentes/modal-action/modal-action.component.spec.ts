import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActionComponent } from './modal-action.component';

describe('ModalActionComponent', () => {
  let component: ModalActionComponent;
  let fixture: ComponentFixture<ModalActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalActionComponent]
    });
    fixture = TestBed.createComponent(ModalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
