import { TestBed } from '@angular/core/testing';

import { LoginAppService } from './login-app.service';

describe('LoginAppService', () => {
  let service: LoginAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
