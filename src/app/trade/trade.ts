import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../balance-service';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade',
  imports: [FormsModule, CommonModule],
  templateUrl: './trade.html',
  styleUrl: './trade.css',
})
export class Trade implements OnInit {

  price: number = 10;
  quantity: number =0;
  stockName: string = '';
  msg: string = '';
  Ordervalue: number = 0;
  Transactions: any[] = [];
  currenttime: any;
  holdingtype: string = 'stock';

  constructor(
    public balanceService: BalanceService,
    public holdingservice: Holdings
  ) {}

  ngOnInit() {
    setInterval(() => {
      let change = (Math.random() * 4 - 2);
      this.price = Math.max(1, Math.round(this.price + change));
    }, 500);
  }

  calculateOrderValue() {
    this.Ordervalue = this.price * this.quantity;
  }

  buy() {
    this.currenttime = Date.now();
    const cost = this.quantity * this.price;

    if (cost > this.balanceService.balanceamount) {
      this.msg = "Not enough balance";
    } else {
      this.balanceService.buys(cost);

      this.holdingservice.buy(
        this.stockName,
        this.quantity,
        this.currenttime,
        this.holdingtype,
        this.price
      );

      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        CurrentTime: Date.now(),
        type: 'Buy'
      });

      this.msg = "Stocks bought successfully";
      this.quantity = 1; // optional reset
    }
  }

  sell() {
    const cost = this.quantity * this.price;

    if (this.holdingservice.sell(this.stockName, this.quantity, this.currenttime)) {

      this.balanceService.sell(cost);

      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        type: "Sell",
        CurrentTime: Date.now()
      });

      this.msg = "Stocks sold successfully";
      this.quantity = 1;

    } else {
      this.msg = "Not enough shares to sell";
    }
  }
}