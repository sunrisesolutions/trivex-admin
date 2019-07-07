import { TestBed } from '@angular/core/testing';

import { AuthAdminGuardService } from './auth-admin-guard.service';

describe('AuthAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthAdminGuardService = TestBed.get(AuthAdminGuardService);
    expect(service).toBeTruthy();
  });
});
