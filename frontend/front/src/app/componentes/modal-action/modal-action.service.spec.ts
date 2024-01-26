import { TestBed } from '@angular/core/testing';

import { ModalActionService } from './modal-action.service';

describe('ModalActionService', () => {
  let service: ModalActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
