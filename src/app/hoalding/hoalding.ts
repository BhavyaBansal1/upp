import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Holdings } from '../holdings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hoalding',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './hoalding.html',
  styleUrls: ['./hoalding.css'],
})
export class Hoalding {

  portfolioValue: number = 0;
  list1: any[] = [];
  intervalid:any;
  autore:boolean=false;

  constructor(public holdingservice: Holdings,public cd:ChangeDetectorRef) {
    this.getallHoldings();
  }
  
//   updatePortfolioValue() {
//     const holdings = this.holdingservice.getAllholdings();
//     let total = 0;
//     for (let i of holdings) {
//   total +=i.quantity * i.price;
// }
//     this.portfolioValue = total;
//   }

  getallHoldings() {
    this.list1 = this.holdingservice.getAllholdings();
  }

  getstocks() {
    return this.list1;
  }
  // .filter(s => s.type === 'stock')

  pagerelod() {
    this.holdingservice.updatePrices();       
  }
  togle_load(){
    this.autore=!this.autore;
    if(this.autore){
    this.intervalid= window.setInterval(() => {
      console.log("autorefresh working")
          this.pagerelod();  
          // this.updatePortfolioValue;
           this.cd.detectChanges();
      },5000)
    }
    else{
      if(this.intervalid){
        clearInterval(this.intervalid);
      }
    }


  }
}