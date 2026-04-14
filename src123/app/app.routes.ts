import { Routes } from '@angular/router';
import { Dashbord } from './dashbord/dashbord';
import { Sumary } from './sumary/sumary';
import { Trade } from './trade/trade';
import { Holdings } from './holdings';
import { Hoalding } from './hoalding/hoalding';
import { Login } from './login/login';
import { SignupComponent } from './signup-component/signup-component';
import { AuthGuard } from './auth-guard';

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
    component: Dashbord,
    canActivate:[AuthGuard]
  },
  {
    path: 'trade',
    component: Trade,
    canActivate:[AuthGuard]
  },
  {
    path: 'sumary',
    component: Sumary,
    canActivate:[AuthGuard]
  },
  {
    path: 'hold',
    component: Hoalding,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    canActivate:[AuthGuard]
  }
];