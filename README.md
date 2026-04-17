import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ✅ Mock AuthService
class MockAuthService {
  shouldReturn = false;

  login(email: string, password: string, role: string) {
    return this.shouldReturn;
  }
}

// ✅ Mock Router
class MockRouter {
  navigatedTo: any = null;

  navigate(path: string[]) {
    this.navigatedTo = path;
  }
}

describe('LoginComponent (no spyOn)', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, FormsModule], // ❌ removed RouterTestingModule
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

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
    authService.shouldReturn = true; // control behavior

    component.email = 'test@mail.com';
    component.password = '123456';
    component.role = 'user'; // ✅ FIXED

    component.login();

    expect(router.navigatedTo).toEqual(['/dashboard']);
  });

  // ✅ 3. Failed login
  it('should show error on failed login', () => {
    authService.shouldReturn = false;

    component.login();

    expect(component.error).toBe('Invalid credentials');
    expect(router.navigatedTo).toBeNull();
  });
});
