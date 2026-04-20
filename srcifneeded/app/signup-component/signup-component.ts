import { Component } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authcomponet } from '../auth/auth';

@Component({
  selector: 'app-signup-component',
  imports: [CommonModule, FormsModule, RouterOutlet,Authcomponet],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {

  email = '';
  password = '';
  error = '';
  Role = '';
  success = '';

  constructor(private auth: AuthService, private router: Router) { }

 signup(data: any) {
  const sign = this.auth.signup(data.email, data.password, data.role);

  if (sign) {
    this.success = 'Signup successful!';
    this.error = '';
    this.router.navigate(['/']);
  } else {
    this.error = 'User already exists';
    this.success = '';
  }
}
}
