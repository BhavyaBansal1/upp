import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hoalding } from './hoalding';
import { Holdings } from '../holdings';
import { ChangeDetectorRef } from '@angular/core';
 
describe('Hoalding Component (Advanced No Jasmine spies)', () => {
  let component: Hoalding;
  let fixture: ComponentFixture<Hoalding>;
 
  let updatePricesCalled = 0;
  let getAllHoldingsCalled = 0;
 
  const mockHoldingsService = {
    getAllholdings: () => {
      getAllHoldingsCalled++;
      return [
        { name: 'TCS', quantity: 10, price: 100 },
        { name: 'INFY', quantity: 5, price: 200 }
      ];
    },
 
    updatePrices: () => {
      updatePricesCalled++;
    }
  };
 
  const mockCdRef = {
    detectChanges: () => {}
  };
 
  beforeEach(async () => {
    updatePricesCalled = 0;
    getAllHoldingsCalled = 0;
 
    await TestBed.configureTestingModule({
      imports: [Hoalding],
      providers: [
        { provide: Holdings, useValue: mockHoldingsService },
        { provide: ChangeDetectorRef, useValue: mockCdRef }
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(Hoalding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create component', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });
 
  
  it('should load holdings on init', () => {
    if (component.list1.length !== 2) {
      throw new Error('Holdings not loaded correctly');
    }
  });
 
  it('should return stocks list', () => {
    const result = component.getstocks();
 
    if (result.length !== 2) {
      throw new Error('getstocks returned wrong data');
    }
  });
  it('should call updatePrices in pagerelod', () => {
    component.pagerelod();
 
    if (updatePricesCalled !== 1) {
      throw new Error('updatePrices not called');
    }
  });
 
  it('should start auto refresh when toggled ON', () => {
    component.togle_load();
 
    if (component.autore !== true) {
      throw new Error('Auto refresh not enabled');
    }
 
    if (!component.intervalid) {
      throw new Error('Interval not created');
    }
  });
  it('should stop auto refresh when toggled OFF', () => {
    // first turn ON
    component.togle_load();
 
    component.togle_load();
 
    if (component.autore !== false) {
      throw new Error('Auto refresh not disabled');
    }
  });
 
  it('should handle errors in pagerelod safely', () => {
    mockHoldingsService.updatePrices = () => {
      throw new Error('API failure');
    };
 
    try {
      component.pagerelod();
    } catch {
      throw new Error('pagerelod should not throw');
    }
  });
 
  it('should have default initial values', () => {
    if (component.portfolioValue !== 0) {
      throw new Error('portfolioValue should be 0');
    }
 
    if (component.autore !== false) {
      throw new Error('autore should be false initially');
    }
 
    if (!Array.isArray(component.list1)) {
      throw new Error('list1 should be array');
    }
  });
});