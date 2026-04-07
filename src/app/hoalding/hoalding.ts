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
  portfolioValue:number=0;
 constructor (public holdingservie:Holdings){
  this.getallHoldings();
 }
 ngOnInit() {
  this.updatePortfolioValue();
  // Update every 1s to reflect dynamic stock price
  setInterval(() => {
    this.updatePortfolioValue();
  }, 1000);
}
updatePortfolioValue() {
  const holdings = this.holdingservie.getAllholdings(); // get all stocks
  let total = 0;
  holdings.forEach(stock => {
    total += stock.quantity * stock.price;
  });

  this.portfolioValue = total;
}
 list1 :any[]=[];
getallHoldings(){
this.list1=this.holdingservie.getAllholdings();
console.log(this.list1);
}

getstocks(){
  return this.list1.filter(s=>s.type==='stock');
}
// getmutualfund(){
//   return this.list1.filter(s=>s.type==='Mutualfunds');
// }
pagerelod(){
  alert('hi');
}
}
