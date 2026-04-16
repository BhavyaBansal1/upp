import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth-service';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  let routerMock = {
    navigatedTo: '',
    navigate: (commands: any[]) => {
      routerMock.navigatedTo = commands.join('/');
    }
  };

  let authMock = {
    isLoggedIn: () => true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  // ✅ 1. should allow access when logged in
  it('should return true if user is logged in', () => {
    authMock.isLoggedIn = () => true;

    const result = guard.canActivate();

    expect(result).toBe(true);
  });

  // ✅ 2. should block access when not logged in
  it('should return false and navigate to login when not logged in', () => {
    authMock.isLoggedIn = () => false;

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(routerMock.navigatedTo).toBe('/');
  });

});
