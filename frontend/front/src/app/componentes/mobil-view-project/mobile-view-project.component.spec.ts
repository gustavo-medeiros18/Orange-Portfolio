import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewProjectComponent } from './mobile-view-project.component';

describe('MobilViewProjectComponent', () => {
  let component: MobileViewProjectComponent;
  let fixture: ComponentFixture<MobileViewProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileViewProjectComponent]
    });
    fixture = TestBed.createComponent(MobileViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
