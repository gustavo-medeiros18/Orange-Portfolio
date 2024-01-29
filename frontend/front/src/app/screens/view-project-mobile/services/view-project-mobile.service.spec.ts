import { TestBed } from '@angular/core/testing';

import { ViewProjectMobileService } from './view-project-mobile.service';

describe('ViewProjectMobileService', () => {
  let service: ViewProjectMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProjectMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
