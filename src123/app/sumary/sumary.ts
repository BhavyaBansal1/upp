import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hoalding } from '../hoalding/hoalding';

@Component({
  selector: 'app-sumary',
  imports: [RouterOutlet,Hoalding],
  templateUrl: './sumary.html',
  styleUrl: './sumary.css',
})
export class Sumary {

}
