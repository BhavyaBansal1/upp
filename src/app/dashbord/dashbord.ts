import { Component, AfterViewInit } from '@angular/core';
import { Hoalding } from '../hoalding/hoalding';
import { Sumary } from '../sumary/sumary';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';
import { ChartComponent } from '../chart/chart';
import { balanceservice } from '../balanceservice';
import { BalanceService } from '../balance-service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [Sumary, Hoalding,ChartComponent],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord implements AfterViewInit {
portfolioValue:number=0;
bal:number=0;
  constructor(public holdingservice: Holdings,public balanceService:BalanceService) {}
  ngOnInit() {
  this.updatePortfolioValue();
  // this.getbanceamount();
  setInterval(() => {
   this.updatePortfolioValue();
  }, 5);
  // setInterval(() => {
  //  this.getbanceamount();
  // }, );
}
updatePortfolioValue() {
  const holdings = this.holdingservice.getAllholdings(); // get all stocks
  let total = 0;
  holdings.forEach(stock => {
    total += stock.quantity * stock.price;
  });

  this.portfolioValue = total;
}
// getbanceamount(){
//   const a=this.balanceService.getBalance;
//   this.bal=a;

// }

// chart staarts from here
  getstocks() {
    return this.holdingservice.getAllholdings();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.createStockChart();
      // this.createMFChart();
    }, 300);
  }
  createStockChart() {
    const stocks = this.getstocks();
    new Chart("stockChart", {
      type: 'bar',
      data: {
        labels: stocks.map(s => s.stockName),
        datasets: [{
          label: 'Stock Quantity',
          data: stocks.map(s => s.quantity)
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  // createMFChart() {
  //   const mf = this.getmutualfund();

  //   new Chart("mfChart", {
  //     type: 'pie',
  //     data: {
  //       labels: mf.map(m => m.stockName),
  //       datasets: [{
  //         data: mf.map(m => m.quantity)
  //       }]
  //     },
  //     options: {
  //       responsive: true
  //     }
  //   });
  // }
  
}