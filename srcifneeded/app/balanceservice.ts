import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class balanceservice {
  balanceamount:number=10000;

  
  buys(amount:number){
    this.balanceamount-=amount
  }
  sell(amount:number){
    this.balanceamount=this.balanceamount+amount
    
  }
  Balance(){
    console.log(this.balanceamount);
    return this.balanceamount;}
}
