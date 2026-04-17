import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login} from './login';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
    let component: Login;
    let fixture: ComponentFixture<Login>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        // Create spies
        authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [Login, FormsModule, RouterTestingModule],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the login component', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to dashboard on successful login', () => {
        authServiceSpy.login.and.returnValue(true);

        component.email = 'test@mail.com';
        component.password = '123456';
        component.Role = 'user';

        component.login();

        expect(authServiceSpy.login).toHaveBeenCalledWith(
            'test@mail.com',
            '123456',
            'user'
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should show error on failed login', () => {
        authServiceSpy.login.and.returnValue(false);

        component.login();

        expect(component.error).toBe('Invalid credentials');
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});
