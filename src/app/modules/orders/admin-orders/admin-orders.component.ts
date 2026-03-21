import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAdminOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.isLoading = false;
      }
    });
  }
}
