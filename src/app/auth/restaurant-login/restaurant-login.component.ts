import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-login.component.html'
})
export class RestaurantLoginComponent {
  login() {
    alert('Restaurant Login successful (Mock!). You can now place orders.');
  }
}
