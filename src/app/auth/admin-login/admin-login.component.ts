import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  login() {
    alert('Admin Login successful (Mock!). In future, this will connect to the backend.');
  }
}
