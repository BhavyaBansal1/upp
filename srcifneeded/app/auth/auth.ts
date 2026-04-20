import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Authcomponet {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() buttonText = '';

  @Output() formSubmit = new EventEmitter<any>();

  email = '';
  password = '';
  role = '';

  submit() {
    this.formSubmit.emit({
      email: this.email,
      password: this.password,
      role: this.role
    });
  }
}