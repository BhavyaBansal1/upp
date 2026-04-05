import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Holdings {
  list:any[]=[];
  buy(stockName:string,quantity:number,currenttime:any,type:string){
    currenttime=Date.now();
    const check=this.list.find(s=>s.stockName === stockName);
    if(check){
      if(quantity>0){
      check.quantity+=quantity;
    }}
    else{
      if(quantity>0){
      this.list.push({stockName,quantity,currenttime,type});
    }}
  }
  sell(stockName:string,quantity:number,currenttime:any){
    const check=this.list.find(s=>s.stockName === stockName);

    // if(check && check.quantity>=quantity){
    //   check.quantity=check.quantity-quantity;
    // }
    if(!check || check.quantity<quantity){
      return false;
    }
    else {
    check.quantity=check.quantity-quantity;
    return true;
    }
    
  }
  getAllholdings(){
      return this.list;
    }
  
}
