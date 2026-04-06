import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Sumary } from '../sumary/sumary';
import { Hoalding } from '../hoalding/hoalding';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';

@Component({
  selector: 'app-dashbord',
  imports: [Sumary, Hoalding],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord implements AfterViewInit {
constructor(public holdingservice:Holdings){
  
}
  getstocks() {
    return [
      { stockName: 'TCS', quantity: 10 },
      { stockName: 'Infosys', quantity: 5 }
    ];
  }

  getmutualfund() {
    return [
      { stockName: 'SBI Fund', quantity: 8 },
      { stockName: 'HDFC Fund', quantity: 6 }
    ];
  }

  // 👉 Lifecycle hook
  ngAfterViewInit() {
    setTimeout(() => {
      this.createStockChart();
      this.createMFChart();
    }, 300);
  }

  // 🟦 STOCK PIE CHART
  createStockChart() {
    const stocks = this.getstocks();

    new Chart("stockChart", {
      type: 'bar',
      data: {
        labels: stocks.map(s => s.stockName),
        datasets: [{
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