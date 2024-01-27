import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActionComponent } from './project-action.component';

describe('ProjectActionComponent', () => {
  let component: ProjectActionComponent;
  let fixture: ComponentFixture<ProjectActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectActionComponent]
    });
    fixture = TestBed.createComponent(ProjectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
