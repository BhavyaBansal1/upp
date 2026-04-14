import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-servie';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth:AuthService, public router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}