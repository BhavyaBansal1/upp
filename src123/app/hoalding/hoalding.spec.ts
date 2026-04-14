import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hoalding } from './hoalding';

describe('Hoalding', () => {
  let component: Hoalding;
  let fixture: ComponentFixture<Hoalding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hoalding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hoalding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
