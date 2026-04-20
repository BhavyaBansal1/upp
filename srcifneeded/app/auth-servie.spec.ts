import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-servie';

describe('AuthServie', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
