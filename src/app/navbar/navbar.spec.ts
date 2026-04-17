import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { AuthService } from '../auth-service';
import 'zone.js';
import 'zone.js/testing';

class MockAuthService {
  getUser() {
    return { name: 'Test User' };
  }
}

describe('Navbar Component', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on initialization', () => {
    expect(component.auth.users).toBeTruthy();
    expect(component.auth.users).toBe('Test User');
  });

  it('should return user from getuser()', () => {
    const user = component.getuser();
    expect(user).toBeTruthy();
    expect(user.name).toBe('Test User');
  });

  it('should display user name in template', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('span')?.textContent)
      .toContain('Test User');
  });
});