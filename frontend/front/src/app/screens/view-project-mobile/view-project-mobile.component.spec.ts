import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectMobileComponent } from './view-project-mobile.component';

describe('ViewProjectMobileComponent', () => {
  let component: ViewProjectMobileComponent;
  let fixture: ComponentFixture<ViewProjectMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectMobileComponent]
    });
    fixture = TestBed.createComponent(ViewProjectMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
