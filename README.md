import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// ✅ Mock AuthService
class MockAuthService {
  login(email: string, password: string, role: string) {
    // default return (can override in test)
    return false;
  }
}

// ✅ Mock Router
class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginComponent (without jasmine)', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    // get instances
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  // ✅ 1. Create
  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ 2. Success login
  it('should navigate to dashboard on successful login', () => {
    // override method
    spyOn(authService, 'login').and.returnValue(true);
    spyOn(router, 'navigate');

    component.email = 'test@mail.com';
    component.password = '123456';
    component.Role = 'user';

    component.login();

    expect(authService.login).toHaveBeenCalledWith(
      'test@mail.com',
      '123456',
      'user'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  // ✅ 3. Failed login
  it('should show error on failed login', () => {
    spyOn(authService, 'login').and.returnValue(false);
    spyOn(router, 'navigate');

    component.login();

    expect(component.error).toBe('Invalid credentials');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
