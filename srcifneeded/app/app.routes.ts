import { Routes } from '@angular/router';
import { Sumary } from './summary/sumary';
import { Trade } from './trade/trade';
import { Holdings } from './holdings';
import { holding } from './holding/holding';
import { SignupComponent } from './signup-component/signup-component';
import { AuthGuard } from './auth-guard';
import { Login } from './login/login';
import { controlauthGuard } from './controlauth-guard';
import { dashboard } from './dashboard/dashboard';

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
    path: 'dashboard',
    component:dashboard,
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
    component: holding,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuard]
  }
];