import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-hoalding',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './hoalding.html',
  styleUrl: './hoalding.css',
})
export class Hoalding {
 constructor (public servicehold:Holdings){
  this.getallHoldings();
 }
 list1 :any[]=[];
getallHoldings(){
this.list1=this.servicehold.getAllholdings();
console.log(this.list1);
}

getstocks(){
  return this.list1.filter(s=>s.type==='stock');
}
getmutualfund(){
  return this.list1.filter(s=>s.type==='Mutualfunds');
}
}
