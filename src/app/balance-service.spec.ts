import { TestBed } from '@angular/core/testing';

import { BalanceService } from './balance-service';
import { Component } from '@angular/core';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be able to give balance', () => {
    const amou=service.getBalance();
    if(amou === null){
      throw new Error("amount is not geting displayed");
    }
  });
  
  it('should be able to buy', () => {
    const amou=service.buys;
    if(amou === null){
      throw new Error("amount is not geting displayed");
    }
  });
  
  it('should be able to sell', () => {
    const amou=service.sell(10000);
    if(amou === null){
      throw new Error("amount is not geting displayed");
    }
  });
});
