import { Component } from '@angular/core';
import { Dashbord } from '../dashbord/dashbord';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../auth-servie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [Dashbord,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(public auth:AuthService){}

// name: string = this.auth.getUser()?.name;
 get user() {
    return this.auth.getUser();
  }
}
