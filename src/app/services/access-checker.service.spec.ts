import { TestBed } from '@angular/core/testing';

import { AccessCheckerService } from './access-checker.service';

describe('AccessCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessCheckerService = TestBed.get(AccessCheckerService);
    expect(service).toBeTruthy();
  });
});
