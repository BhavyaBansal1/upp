import {Component,AfterViewInit,ViewChildren,QueryList,ElementRef,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class ChartComponent implements AfterViewInit {

  // 🔹 Multiple line charts
  @ViewChildren('chartCanvas') canvases!: QueryList<ElementRef>;

  // 🔹 Single pie chart
  @ViewChild('pieChartCanvas') pieCanvas!: ElementRef;
  @ViewChild('advisorychartcanvas') advisorycanvas!: ElementRef;

  stocks = [
    { name: 'Microsoft', basePrice: 100 },
    { name: 'Tata', basePrice: 50 },
    { name: 'Tesla', basePrice: 200 },
    { name: 'Apple', basePrice: 150 }
  ];
Advisortip=[
  {name :'Diversification',value:90},
  {name :'Momentum',value:50},
  {name :'RiskBalance',value:70},
  {name :'Activity',value:85}
]
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  monthlyReturns = [10, 20, 15, 25, 30];

  ngAfterViewInit() {
    
      this.createCharts();
      this.createPieChart();
      this.Advisorychart();
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

  // 🔹 Create Line Charts
  createCharts() {

    const years = this.getYears();

    this.canvases.forEach((canvas, index) => {
      const ctx = canvas.nativeElement;

      new Chart(ctx, {
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
    });
  }
  createPieChart() {
    

    const ctx = this.pieCanvas.nativeElement;

    new Chart(ctx, {
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
  }

Advisorychart() {

  const ctx = this.advisorycanvas.nativeElement;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: this.Advisortip.map(a => a.name),  
      datasets: [{
        label: 'Advisory Score',
        data: this.Advisortip.map(a => a.value),
      }]
    },
    options: {
      responsive: true
    }
  });
}}