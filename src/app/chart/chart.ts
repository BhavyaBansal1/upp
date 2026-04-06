import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class ChartComponent implements AfterViewInit {

  // ✅ Get all canvas elements
  @ViewChildren('chartCanvas') canvases!: QueryList<ElementRef>;

  // ✅ Dummy stock data
  stocks = [
    { name: 'Microsoft', basePrice: 100 },
    { name: 'Tata', basePrice: 50 },
    { name: 'Tesla', basePrice: 200 },
    { name: 'Apple', basePrice: 150 }
  ];

  ngAfterViewInit() {
    this.createCharts();
  }

  // 📈 Generate dummy price data (5 years)
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

  // 📅 Years
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

  // 📊 Create charts
  createCharts() {
    const years = this.getYears();

    this.canvases.forEach((canvasRef, index) => {
      const ctx = canvasRef.nativeElement;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [{
            label: `${this.stocks[index].name} Price`,
            data: this.generateData(this.stocks[index].basePrice),
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }
}