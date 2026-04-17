import { Component, OnInit } from '@angular/core';
import { Dashbord } from '../dashbord/dashbord';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Dashbord, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  user: any;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser(); // ✅ FIX
  }

  getuser() {
    return this.user;
  }
}