import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Trade } from './trade';
import { BalanceService } from '../balance-service';
import { Holdings } from '../holdings';

describe('Trade', () => {
  let component: Trade;
  let fixture: ComponentFixture<Trade>;

  let balance = 10000;
  const balanceMock = {
    balanceamount: balance,
    buys: (amt: number) => {
      balance -= amt;
    },
    sell: (amt: number) => {
      balance += amt;
    }
  };
  const holdingMock = {
    buy: () => { },
    sell: () => true,
    getQuantity: () => 10,
    getAllholdings: () => []
  };

  beforeEach(async () => {
    balance = 10000;
    await TestBed.configureTestingModule({
      imports: [Trade],
      providers: [
        { provide: BalanceService, useValue: balanceMock },
        { provide: Holdings, useValue: holdingMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Trade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });

  it('should calculate order value correctly', () => {
    component.price = 100;
    component.quantity = 2;
    component.calculateOrderValue();
    if (component.Ordervalue !== 200) {
      throw new Error('Order value incorrect');
    }
  });

  it('should buy stocks successfully', () => {
    component.stockName = 'tata';
    component.quantity = 2;
    component.price = 100;
    component.buy();

    if (component.msg !== 'Stocks bought failed') {
      throw new Error('Buy failed');
    }

  });

  it('should sell stocks successfully', () => {
    component.stockName = 'tata';
    component.quantity = 1;
    component.price = 100;
    component.sell();
    if (component.msg !== 'Stocks sold  successfully') {
      throw new Error('stocks cannot be sell ');
    }
  });
  it('should fail buy when stock name missing or quantity is negative', () => {
    component.stockName = '';
    component.quantity = -11;
    component.price = 100;
    component.buy();
    if (component.msg !== 'Enter stock name') {
      throw new Error('Stocks buy failed');
    }
  });
  it('should fail buy when insufficient balance', () => {
    component.stockName = 'Micro';
    component.quantity = 1000;
    component.price = 1000;
    component.buy();
    if (component.Ordervalue >= balance) {
      throw new Error('Balancen is insufficient');
    }
  });
  it('should fail sell when not enough shares', () => {
    holdingMock.sell = () => false;

    component.stockName = 'tata';
    component.quantity = 10;
    component.sell();
    if (component.msg === 'Error while selling') {
      throw new Error('not able to sold');
    }
  });

  it('should keep only last 5 transactions', () => {
    component.Transactions = [1, 2, 3, 4, 5, 6, 7];
    component.saveRecentTransactions();
    if (component.Transactions.length !== 5) {
      throw new Error('Transaction limit not applied');
    }
  });

});
