import { Component } from '@angular/core';
import { AuthService } from '../auth-servie';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  imports: [CommonModule,FormsModule,RouterOutlet],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
  export class SignupComponent {

  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private auth:AuthService, private router:Router) {}

  signup() {

    const ok = this.auth.signup(this.email, this.password);

    if (ok) {
      this.success = 'Signup successful! Please login.';
      this.error = '';
      this.router.navigate(['/']); // go to login
    } else {
      this.error = 'User already exists';
      this.success = '';
    }
  }

}
