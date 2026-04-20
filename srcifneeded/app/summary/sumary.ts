import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { holding } from '../holding/holding';

@Component({
  selector: 'app-sumary',
  imports: [RouterOutlet, holding],
  templateUrl: './sumary.html',
  styleUrl: './sumary.css',
})
export class Sumary {

}
