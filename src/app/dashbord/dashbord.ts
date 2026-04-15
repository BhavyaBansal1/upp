import { Component, AfterViewInit } from '@angular/core';
import { Hoalding } from '../hoalding/hoalding';
import { Sumary } from '../sumary/sumary';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';
import { ChartComponent } from '../chart/chart';
import { BalanceService } from '../balance-service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [Sumary, Hoalding, ChartComponent],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord implements AfterViewInit {

  portfolioValue: number = 0;

  stockChart!: Chart;

  constructor(
    public holdingservice: Holdings,public balanceService: BalanceService ) {}

  ngOnInit() {
    this.updatePortfolioValue();
    this.createStockChart();

    setInterval(() => {
      this.updatePortfolioValue();
    }, 1000);
  }

  updatePortfolioValue() {
    try {
      const holdings = this.holdingservice.getAllholdings();
      let total = 0;

      holdings.forEach(stock => {
        total += stock.quantity * stock.price;
      });

      this.portfolioValue = total;
    } catch (e) {
      console.error(e);
    }
  }

  getstocks() {
    return this.holdingservice.getAllholdings();
  }

  ngAfterViewInit() {
    this.createStockChart();

    setTimeout(() => {
      this.createStockChart();
    }, 0);
  }

  createStockChart() {
    try {
      if (this.stockChart) {
        this.stockChart.destroy();
      }
      const stocks = this.getstocks();
      this.stockChart = new Chart("stockChart", {
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

    } catch (e) {
      console.error(e);
    }
  }



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
