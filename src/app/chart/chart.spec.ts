
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart';

describe('Chart', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
it('should create component', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create stock chart' ,()=>{
    component.createCharts();
    if(!component.createCharts){
      throw new Error ("chart  are not created");
    }
  });
   it('should create pie chart' ,()=>{
    component.createPieChart();
    if(!component.pieCanvas){
      throw new Error ("chart  are not created");
    }
  });
   it('should create stock chart' ,()=>{
    component.createCharts();
    if(!component.createCharts){
      throw new Error ("chart not created");
    }
  });
   it('should create stock chart' ,()=>{
    component.segmachart();
    if(!component.segmentcanvas){
      throw new Error ("chart are  not created");
    }
  });
  it('should create stock chart' ,()=>{
    component.Advisorychart();
    if(!component.advisorycanvas){
      throw new Error ("chart are  not created");
    }
  });
  it('should create stock chart' ,()=>{
    component.createPieChart();
    if(!component.pieCanvas){
      throw new Error ("chart are  not created");
    }
  });
  it('should check risk profile' ,()=>{
   const r= component.riskProfilech();
    if( r ==='Unknownn'){
      throw new Error ("risk can not be evaluated");
    }
  });
   it('should check risk profile' ,()=>{
    let r = component.tradingActivitySegment();
     if(r === 'Unknownn'){
      throw new Error ("Trading activity cannot be delected");
    }
  });
  
});