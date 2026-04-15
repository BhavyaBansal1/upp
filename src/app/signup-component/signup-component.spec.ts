import { TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup-component';
import { AuthService } from '../auth-servie';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('SignupComponent - Pure TestBed ', () => {
  let component: SignupComponent;

  let callCount = 0;
  let lastArgs: any[] = [];

  const authServiceMock = {
    signup: (email: string, password: string, role: string) => {
      callCount++;
      lastArgs = [email, password, role];

      return email !== 'exists@test.com';
    }
  };

  const routerMock = {
    navigatedTo: '',
    navigate: (commands: any[]) => {
      routerMock.navigatedTo = commands.join('/');
    }
  };

  beforeEach(async () => {
    callCount = 0;
    lastArgs = [];
    routerMock.navigatedTo = '';

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });

  it('should signup successfully and navigate to login', () => {
    component.email = 'new@test.com';
    component.password = '123456';
    component.Role = 'user';

    component.signup();

    if (component.success !== 'Signup successful! Please login.') {
      throw new Error('Success message mismatch');
    }

    if (component.error !== '') {
      throw new Error('Error should be empty');
    }

    if (routerMock.navigatedTo !== '/') {
      throw new Error('Navigation failed');
    }
  });

  it('should fail signup when user already exists', () => {
    component.email = 'exists@test.com';
    component.password = '123456';
    component.Role = 'admin';

    component.signup();

    if (component.error !== 'User already exists') {
      throw new Error('Error message mismatch');
    }

    if (component.success !== '') {
      throw new Error('Success should be empty');
    }

    if (routerMock.navigatedTo !== '') {
      throw new Error('Should not navigate on failure');
    }
  });

  it('should pass correct values to AuthService', () => {
    component.email = 'a@b.com';
    component.password = 'pass123';
    component.Role = 'user';

    component.signup();

    if (callCount !== 1) {
      throw new Error(`Expected 1 call, got ${callCount}`);
    }

    if (
      lastArgs[0] !== 'a@b.com' ||
      lastArgs[1] !== 'pass123' ||
      lastArgs[2] !== 'user'
    ) {
      throw new Error('Arguments mismatch in signup call');
    }
  });
});