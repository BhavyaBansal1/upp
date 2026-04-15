import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true; // simple logic
};

describe('authGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

});