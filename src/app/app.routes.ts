import { Routes } from '@angular/router';
import { Dashbord } from './dashbord/dashbord';
import { Sumary } from './summary/sumary';
import { Trade } from './trade/trade';
import { Holdings } from './holdings';
import { Hoalding } from './holding/hoalding';
import { SignupComponent } from './signup-component/signup-component';
import { AuthGuard } from './auth-guard';
import { Login } from './login/login';
import { controlauthGuard } from './controlauth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Login,
    data: { hideNavbar: true }
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashbord',
    component: Dashbord,
    canActivate: [AuthGuard]
  },
  {
    path: 'trade',
    component: Trade,
    canActivate: [AuthGuard, controlauthGuard]

  },
  {
    path: 'sumary',
    component: Sumary,
    canActivate: [AuthGuard]
  },
  {
    path: 'hold',
    component: Hoalding,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuard]
  }
];