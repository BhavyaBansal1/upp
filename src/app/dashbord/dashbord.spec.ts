import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashbord } from './dashbord';
import { Holdings } from '../holdings';
import { ChangeDetectorRef } from '@angular/core';
 
describe('Dashbord Component (Advanced No Jasmine spies)', () => {
  let component: Dashbord;
  let fixture: ComponentFixture<Dashbord>;
 
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
      imports: [Dashbord],
      providers: [
        { provide: Holdings, useValue: mockHoldingsService },
        { provide: ChangeDetectorRef, useValue: mockCdRef }
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(Dashbord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create component', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });
  it('should return stocks list', () => {
    const result = component.getstocks();
    if(!result || result.length ===0){
      throw new Error ("stock list is empty");
    }

});
it ('should update portfolio value', ()=>{
  const ret=component.updatePortfolioValue();
  if(ret === null){
     throw new Error ("update is not working");
  }
  } );

  it('should create stock chart' ,()=>{
    component.createStockChart();
    if(!component.stockChart){
      throw new Error ("chart not created");
    }
  });


});