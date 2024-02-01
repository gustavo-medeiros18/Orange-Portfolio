import { TestBed } from '@angular/core/testing';

import { AuthorizationInterceptorService } from './authorization-interceptor.service';

describe('AuthorizationInterceptorService', () => {
  let service: AuthorizationInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
