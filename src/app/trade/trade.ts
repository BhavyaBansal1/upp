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
  quantity: any;
  type: string = "";
  stockName: string = '';
  msg: string = '';
  Ordervalue: number = 0;
  Transactions: any[] = [];
  currenttime: any;
  holdingtype: string = '';
  available:number=0;

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
      this.msg = "not enough balance";
    } else {
      this.balanceService.buys(cost);
      this.holdingservice.buy(
        this.stockName,
        this.quantity,
        this.currenttime,
        this.holdingtype,
        this.price
      );
this.available=this.quantity
      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        CurrentTime: Date.now(),
        type: 'Buy'
      });

      this.msg = "stocks bought";
    }
  }

  sell() {
    const cost = this.quantity * this.price;

    if (this.holdingservice.sell(this.stockName, this.quantity, this.currenttime)) {

      this.Transactions.push({
        stockName: this.stockName,
        Quantity: this.quantity,
        Price: this.price,
        type: "Sell",
        CurrentTime: Date.now()
      });

      this.balanceService.sell(cost);
      this.msg = "stocks are sold";

    } else {
      this.msg = "either you do not hold this stock or not enough quantity";
    }
  }

}