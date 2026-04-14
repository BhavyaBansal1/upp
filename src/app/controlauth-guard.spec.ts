import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { controlauthGuard } from './controlauth-guard';

describe('controlauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => controlauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
