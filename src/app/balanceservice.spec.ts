import { TestBed } from '@angular/core/testing';

import { balanceservice } from './balanceservice';
import { BalanceService } from './balance-service';

describe('Balanceservice', () => {
  let service:BalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
