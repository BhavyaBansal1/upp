import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-servie';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterOutlet,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  error = '';
  Role='';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const success = this.auth.login(this.email, this.password,this.Role).subscribe(res => {
  if (res) {
    this.router.navigate(['/dashboard']);
  } else {
    this.error = 'Invalid credentials';
  }

});    if (success) {
      this.router.navigate(['/dashbord']); 
    } else {
      this.error = 'Invalid credentials';
    }
  }
  
}