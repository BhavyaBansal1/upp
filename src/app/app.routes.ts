import { Routes } from '@angular/router';
import { Dashbord } from './dashbord/dashbord';
import { Sumary } from './sumary/sumary';
import { Trade } from './trade/trade';
import { Holdings } from './holdings';
import { Hoalding } from './hoalding/hoalding';
import { Login } from './login/login';
import { SignupComponent } from './signup-component/signup-component';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },
  {
   path: 'signup', 
   component:SignupComponent
  },
  {
    path: 'dashbord',
    component: Dashbord
  },
  {
    path: 'trade',
    component: Trade
  },
  {
    path: 'sumary',
    component: Sumary
  },
  {
    path: 'hold',
    component: Hoalding
  },
  {
    path: '**',
    redirectTo: ''
  }
];