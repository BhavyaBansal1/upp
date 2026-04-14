import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public rou: Router){}
    public users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  signup(email: string, password: string): boolean {

    const exists = this.users.find(u => u.email === email);
    if (exists) {
      return false; 
    }
    this.users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(this.users));

    return true;
  }
  login(email: string, password: string): boolean {

    if (this.users.find(u => u.email === email && u.password=== password )) {

      const toke = {
        name:email.split("@")[0].trim(),
        email:email
      };

      const token = btoa(JSON.stringify(toke));
      localStorage.setItem('token', token);

      return true;
    }

    return false;
  }

  getUser() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(atob(token)) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
  localStorage.removeItem('token');
  
  this.rou.navigate(['/']); 
}
}