import { Component, AfterViewInit } from '@angular/core';
import { Hoalding } from '../hoalding/hoalding';
import { Sumary } from '../sumary/sumary';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';
import { ChartComponent } from '../chart/chart';
import { balanceservice } from '../balanceservice';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [Sumary, Hoalding,ChartComponent],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord implements AfterViewInit {
portfolioValue:number=0;
  constructor(public holdingservice: Holdings, public balanceservice:balanceservice) {}
  ngOnInit() {
  this.updatePortfolioValue();

  // Update every 1s to reflect dynamic stock price
  setInterval(() => {
    this.updatePortfolioValue();
  }, 1000);
}
updatePortfolioValue() {
  const holdings = this.holdingservice.getAllholdings(); // get all stocks
  let total = 0;
  holdings.forEach(stock => {
    total += stock.quantity * stock.price;
  });

  this.portfolioValue = total;
}

  
  getstocks() {
    return this.holdingservice
      .getAllholdings()
      .filter(s => s.type === 'stock');
  }

  // ✅ Get MUTUAL FUNDS from service
  getmutualfund() {
    return this.holdingservice
      .getAllholdings()
      .filter(s => s.type === 'Mutualfunds');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createStockChart();
      this.createMFChart();
    }, 300);
  }

  // 🟦 STOCK BAR CHART
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

  // 🟩 MUTUAL FUND PIE CHART
  createMFChart() {
    const mf = this.getmutualfund();

    new Chart("mfChart", {
      type: 'pie',
      data: {
        labels: mf.map(m => m.stockName),
        datasets: [{
          data: mf.map(m => m.quantity)
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}