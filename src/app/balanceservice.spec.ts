import { TestBed } from '@angular/core/testing';

import { Balanceservice } from './balanceservice';

describe('Balanceservice', () => {
  let service: Balanceservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Balanceservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
