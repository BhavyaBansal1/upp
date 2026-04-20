import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authcomponet } from './auth';

describe('Auth', () => {
  let component: Authcomponet;
  let fixture: ComponentFixture<Authcomponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authcomponet],
    }).compileComponents();

    fixture = TestBed.createComponent(Authcomponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
