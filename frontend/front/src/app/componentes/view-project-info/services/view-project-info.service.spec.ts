import { TestBed } from '@angular/core/testing';

import { ViewProjectInfoService } from './view-project-info.service';

describe('ViewProjectInfoService', () => {
  let service: ViewProjectInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProjectInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
