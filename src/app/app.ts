import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashbord } from './dashbord/dashbord';
import { Navbar } from './navbar/navbar';
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashbord, Navbar, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('firstapp');
}
