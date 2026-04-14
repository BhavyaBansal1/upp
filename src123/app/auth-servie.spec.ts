import { TestBed } from '@angular/core/testing';

import { AuthServie } from './auth-servie';

describe('AuthServie', () => {
  let service: AuthServie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
