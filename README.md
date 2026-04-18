import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';

// ✅ Mock Router
class MockRouter {
  navigatedTo: any = null;

  navigate(path: string[]) {
    this.navigatedTo = path;
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as unknown as MockRouter;

    // ✅ clear storage before each test
    localStorage.clear();
    service.users = [];
  });

  // ✅ 1. Service creation
  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  // ✅ 2. Signup success
  it('should signup a new user', () => {
    const result = service.signup('test@mail.com', '123', 'user');

    expect(result).toBeTrue();
    expect(service.users.length).toBe(1);
  });

  // ✅ 3. Signup duplicate
  it('should not allow duplicate signup', () => {
    service.signup('test@mail.com', '123', 'user');
    const result = service.signup('test@mail.com', '123', 'user');

    expect(result).toBeFalse();
  });

  // ✅ 4. Login success
  it('should login with correct credentials', () => {
    service.signup('test@mail.com', '123', 'user');

    const result = service.login('test@mail.com', '123', 'user');

    expect(result).toBeTrue();
    expect(localStorage.getItem('token')).toBeTruthy();
  });

  // ✅ 5. Login fail
  it('should fail login with wrong credentials', () => {
    const result = service.login('wrong@mail.com', '123', 'user');

    expect(result).toBeFalse();
  });

  // ✅ 6. getUser
  it('should return user from token', () => {
    service.signup('test@mail.com', '123', 'user');
    service.login('test@mail.com', '123', 'user');

    const user = service.getUser();

    expect(user.email).toBe('test@mail.com');
    expect(user.role).toBe('user');
  });

  // ✅ 7. isLoggedIn
  it('should return true if token exists', () => {
    service.signup('test@mail.com', '123', 'user');
    service.login('test@mail.com', '123', 'user');

    expect(service.isLoggedIn()).toBeTrue();
  });

  // ✅ 8. logout
  it('should logout and clear token', () => {
    service.signup('test@mail.com', '123', 'user');
    service.login('test@mail.com', '123', 'user');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigatedTo).toEqual(['/']);
  });

  // ✅ 9. getrole
  it('should return role from token', () => {
    service.signup('test@mail.com', '123', 'admin');
    service.login('test@mail.com', '123', 'admin');

    const role = service.getrole();

    expect(role).toBe('admin');
  });
});
