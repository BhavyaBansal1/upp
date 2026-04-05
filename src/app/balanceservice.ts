import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class balanceservice {
  balanceamount:number=10000;

  Balance(){
    return this.balanceamount;
  }buys(amount:number){
    this.balanceamount=this.balanceamount-amount
  }
  sell(amount:number){
    this.balanceamount=this.balanceamount+amount
  }
}
