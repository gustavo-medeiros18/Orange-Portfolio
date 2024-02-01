import { TestBed } from '@angular/core/testing';

import { ProfileActionService } from './profile-action.service';

describe('ProfileActionService', () => {
  let service: ProfileActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
