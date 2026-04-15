import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(public rou: Router){}
    public users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

  signup(email: string, password: string, role: any): Observable<boolean> {

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const exists = users.find((u: any) => u.email === email);

  if (exists) {
    return of(false); // simulate API response
  }

  users.push({ email, password, role });
  localStorage.setItem('users', JSON.stringify(users));

  return of(true); // simulate API response
}
  login(email: string, password: string, role: any): Observable<boolean> {

  if (this.users.find(u => u.email === email && u.password === password)) {

    const toke = {
      role: role,
      name: email.split("@")[0].trim(),
      email: email
    };

    const token = btoa(JSON.stringify(toke));
    localStorage.setItem('token', token);

    return of(true);   // simulate success response
  }

  return of(false);    // simulate failure response
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
getrole(){
  const t=localStorage.getItem('token');
  if(!t){
    return null;
  }
  const user=JSON.parse(atob(t));
  console.log(user.role);
  return user.role;

}
}