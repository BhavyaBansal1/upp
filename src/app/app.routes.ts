import { Routes } from '@angular/router';
import { Dashbord } from './dashbord/dashbord';
import { Sumary } from './sumary/sumary';
import { Trade } from './trade/trade';
import { Holdings } from './holdings';
import { Hoalding } from './hoalding/hoalding';

export const routes: Routes = [{
    path:"sumary",
    component:Sumary
},{
path:"trade",
component:Trade
},{
path:"dashbord",
component:Dashbord
},
{
    path:"hold",
    component:Hoalding
},
{
    path:"**",
    component:Dashbord
}
];
