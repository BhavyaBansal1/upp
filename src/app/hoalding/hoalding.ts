import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hoalding',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './hoalding.html',
  styleUrls: ['./hoalding.css'],
})
export class Hoalding {

  portfolioValue: number = 0;
  list1: any[] = [];

  constructor(public holdingservice: Holdings) {
    this.getallHoldings();
  }

  ngOnInit() {
    this.updatePortfolioValue();

  }

  updatePortfolioValue() {
    const holdings = this.holdingservice.getAllholdings();
    let total = 0;
    for (let i of holdings) {
  total +=i.quantity * i.price;
}

    this.portfolioValue = total;
  }

  getallHoldings() {
    this.list1 = this.holdingservice.getAllholdings();
  }

  getstocks() {
    return this.list1;
  }
  // .filter(s => s.type === 'stock')

  pagerelod() {
    this.holdingservice.updatePrices(); 
    this.updatePortfolioValue();       
  }
}