import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sumary } from './sumary';

describe('Sumary', () => {
  let component: Sumary;
  let fixture: ComponentFixture<Sumary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sumary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sumary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
