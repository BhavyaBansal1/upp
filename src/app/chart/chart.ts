import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { Holdings } from '../holdings';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class ChartComponent implements AfterViewInit {

  Risktype: string = '';

  @ViewChildren('chartCanvas') canvases!: QueryList<ElementRef>;
  @ViewChild('pieChartCanvas') pieCanvas!: ElementRef;
  @ViewChild('advisorychartcanvas') advisorycanvas!: ElementRef;
  @ViewChild('segmentchartcanvas') segmentcanvas!: ElementRef;

  list1: any[] = [];

  constructor(public holdingservic: Holdings) {
    this.list1 = this.holdingservic.getAllholdings();
  }
  totalst: number = 0;
  totalmf: any = 0;
  totalc: any = 0;
  riskProfile: any;
  charts: Chart[] = [];
  pieChart!: Chart;
  advisoryChart!: Chart;
  segmentChart!: Chart;

  calculatepercentage() {
    this.totalst = 0;
    this.totalmf = 0;

    for (let i in this.list1) {
      if (this.list1[i].type === 'stock') {
        this.totalst += this.list1[i].quantity;
      } else {
        this.totalmf += this.list1[i].quantity;
      }
    }

    this.totalc = this.totalst + this.totalmf;
    console.log(this.totalc);
  }

  stocks = [
    { name: 'Microsoft', basePrice: 100 },
    { name: 'Tata', basePrice: 50 },
    { name: 'Tesla', basePrice: 200 },
    { name: 'Apple', basePrice: 150 }
  ];

  Advisortip = [
    { name: 'Diversification', value: 90 },
    { name: 'Momentum', value: 50 },
    { name: 'RiskBalance', value: 70 },
    { name: 'Activity', value: 85 }
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  monthlyReturns = [10, 20, 15, 25, 30];

  segments = ['stocks', 'funds'];

  ngAfterViewInit() {
    try {
       this.createCharts();
        this.createPieChart();
        this.Advisorychart();
        this.calculatepercentage();
        this.segmachart();
      setInterval(() => {
        this.createCharts();
        this.createPieChart();
        this.Advisorychart();
        this.calculatepercentage();
        this.segmachart();
      }, 100000);
    } catch (e) {
      console.error(e);
    }
  }

  generateData(basePrice: number): number[] {
    const data: number[] = [];
    let price = basePrice;
    for (let i = 0; i < 5; i++) {
      const change = price * (Math.random() * 0.4 - 0.2);
      price = Math.max(10, Math.round(price + change));
      data.push(price);
    }
    return data;
  }
  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    return [
      currentYear - 4,
      currentYear - 3,
      currentYear - 2,
      currentYear - 1,
      currentYear
    ];
  }

  createCharts() {
    try {
      const years = this.getYears();
      this.charts.forEach(c => c.destroy());
      this.charts = [];

      this.canvases.forEach((canvas, index) => {
        const ctx = canvas.nativeElement;

        const chart = new Chart(ctx, {
          type: 'line',
    data: {
            labels: years,
            datasets: [{
 label: `${this.stocks[index].name} Price`,
 data: this.generateData(this.stocks[index].basePrice),
 fill: true,
 tension: 0.4
            }]
          },
          options: {
            responsive: true
          }
        });

        this.charts.push(chart);
      });

    } catch (e) {
      console.error(e);
    }
  }

  createPieChart() {
    try {
      const ctx = this.pieCanvas.nativeElement;

      if (this.pieChart) {
        this.pieChart.destroy();
      }

      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.months,
          datasets: [{
            label: 'Monthly Return (%)',
            data: this.monthlyReturns,
            backgroundColor: [
 '#FF6384',
 '#36A2EB',
 '#FFCE56',
 '#4BC0C0',
 '#9966FF'
            ]
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

  Advisorychart() {
    try {
      const ctx = this.advisorycanvas.nativeElement;

      if (this.advisoryChart) {
        this.advisoryChart.destroy();
      }

      this.advisoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.Advisortip.map(a => a.name),
          datasets: [{
            label: 'Advisory Score',
            data: this.Advisortip.map(a => a.value * Math.random()),
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
  segmachart() {
    try {
      const ctx = this.segmentcanvas.nativeElement;
      if (this.segmentChart) {
        this.segmentChart.destroy();
      }
      this.segmentChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.segments,
          datasets: [{
            label: 'usersegmentation',
            data: [
 (this.totalst / this.totalc) * 100,
 (this.totalmf / this.totalc) * 100
            ],
            backgroundColor: [
 '#FF6384',
 '#36A2EB',
            ]
          }]
        }
      });

    } catch (e) {
      console.error(e);
    }
  }

  riskProfilech() {
    try {
      const stockPct = this.totalst / this.totalc;
      if (stockPct >= 0.7) return 'Growth-Oriented';
      if (stockPct >= 0.45) return 'Balanced';
      return 'Conservative';
    } catch {
      return 'Unknownn';
    }
  }

  tradingActivitySegment() {
    try {
      const recentCount = this.totalc;
      if (recentCount >= 70) return 'Active Trader';
      if (recentCount >= 75 && recentCount <= 90) return 'Consistent Investor';
      return 'Passive Investor';
    } catch {
      return 'Unknown';
    }
  }
}