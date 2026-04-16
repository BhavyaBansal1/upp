import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Trade } from './trade';
import { BalanceService } from '../balance-service';
import { Holdings } from '../holdings';

describe('Trade', () => {
  let component: Trade;
  let fixture: ComponentFixture<Trade>;

  let buyCalled = 0;
  let sellCalled = 0;
  let balance = 10000;

  // ✅ Balance mock
  const balanceMock = {
    balanceamount: balance,
    buys: (amt: number) => {
      buyCalled++;
      balance -= amt;
    },
    sell: (amt: number) => {
      sellCalled++;
      balance += amt;
    }
  };

  // ✅ Holdings mock (FIXED)
  const holdingMock = {
    buy: () => {},
    sell: () => true,
    getQuantity: () => 10,          // ✅ REQUIRED (fixes error)
    getAllholdings: () => []        // ✅ safe extra
  };

  beforeEach(async () => {
    buyCalled = 0;
    sellCalled = 0;
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
    fixture.detectChanges(); // ✅ triggers template safely now
  });

  // -----------------------
  // ✅ CREATE
  // -----------------------
  it('should create', () => {
    if (!component) throw new Error('Component not created');
  });

  // -----------------------
  // ✅ INIT (localStorage)
  // -----------------------
  it('should load transactions from localStorage', () => {
    localStorage.setItem('transactions', JSON.stringify([{ stockName: 'TCS' }]));

    component.ngOnInit();

    if (component.Transactions.length === 0) {
      throw new Error('Transactions not loaded');
    }
  });

  // -----------------------
  // ✅ CALCULATION
  // -----------------------
  it('should calculate order value correctly', () => {
    component.price = 100;
    component.quantity = 2;

    component.calculateOrderValue();

    if (component.Ordervalue !== 200) {
      throw new Error('Order value incorrect');
    }
  });

  // -----------------------
  // ✅ BUY SUCCESS
  // -----------------------
  it('should buy stocks successfully', () => {
    component.stockName = 'TCS';
    component.quantity = 1;
    component.price = 100;

    component.buy();

    if (component.msg !== 'Stocks bought checkfully') {
      throw new Error('Buy failed');
    }

    if (buyCalled !== 1) {
      throw new Error('BalanceService.buy not called');
    }

    if (component.Transactions.length === 0) {
      throw new Error('Transaction not recorded');
    }
  });

  // -----------------------
  // ❌ BUY FAIL - NO NAME
  // -----------------------
  it('should fail buy when stock name missing', () => {
    component.stockName = '';
    component.quantity = 1;
    component.price = 100;

    component.buy();

    if (component.msg !== 'Enter stock name') {
      throw new Error('Stock name validation failed');
    }
  });

  // -----------------------
  // ❌ BUY FAIL - LOW BALANCE
  // -----------------------
  it('should fail buy when insufficient balance', () => {
    component.stockName = 'TCS';
    component.quantity = 100000;
    component.price = 1000;

    component.buy();

    if (component.msg !== 'Not enough balance') {
      throw new Error('Balance validation failed');
    }
  });

  // -----------------------
  // ✅ SELL SUCCESS
  // -----------------------
  it('should sell stocks successfully', () => {
    component.stockName = 'TCS';
    component.quantity = 1;
    component.price = 100;

    component.sell();

    if (component.msg !== 'Stocks sold checkfully') {
      throw new Error('Sell failed');
    }

    if (sellCalled !== 1) {
      throw new Error('BalanceService.sell not called');
    }
  });

  // -----------------------
  // ❌ SELL FAIL
  // -----------------------
  it('should fail sell when not enough shares', () => {
    holdingMock.sell = () => false;

    component.stockName = 'TCS';
    component.quantity = 10;

    component.sell();

    if (component.msg !== 'Not enough shares') {
      throw new Error('Sell validation failed');
    }
  });

  // -----------------------
  // ✅ TRANSACTION LIMIT
  // -----------------------
  it('should keep only last 5 transactions', () => {
    component.Transactions = [1,2,3,4,5,6,7];

    component.saveRecentTransactions();

    if (component.Transactions.length !== 5) {
      throw new Error('Transaction limit not applied');
    }
  });

});# upp
