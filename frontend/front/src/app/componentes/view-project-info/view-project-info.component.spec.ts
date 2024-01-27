import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectInfoComponent } from './view-project-info.component';

describe('ViewProjectInfoComponent', () => {
  let component: ViewProjectInfoComponent;
  let fixture: ComponentFixture<ViewProjectInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectInfoComponent]
    });
    fixture = TestBed.createComponent(ViewProjectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
