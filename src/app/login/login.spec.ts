import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../auth-servie';
import { Router } from '@angular/router';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let authServiceSpy: any;
  let routerSpy: any;
  let callCount = 0;

  beforeEach(async () => {

    authServiceSpy = {
      login(email: string, password: string,role:any): boolean {
callCount++;
      const toke = {
        role:role,
        name:email.split("@")[0].trim(),
        email:email
      };
      const token = btoa(JSON.stringify(toke));
      localStorage.setItem('token', token);

      return true;
    }
  }

    routerSpy = {
      navigate: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });
it('should create component', () => {
    if (!component) {
      throw new Error('Component not created');
    }
  });
  it('should allow login if credential enter re correct',()=>{
      if()
  });


});