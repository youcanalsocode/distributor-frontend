import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = true;
  expandedOrderId: number | null = null;
  updatingStatusId: number | null = null;
  statusMessage: { text: string; type: 'success' | 'error' } | null = null;

  readonly statusOptions = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];

  readonly statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    pending:    { label: 'Pending',    bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-400' },
    confirmed:  { label: 'Confirmed',  bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500'   },
    dispatched: { label: 'Dispatched', bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    delivered:  { label: 'Delivered',  bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500'  },
    cancelled:  { label: 'Cancelled',  bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-400'    }
  };

  get sortedOrders(): Order[] {
    return [...this.orders].sort((a, b) => a.id - b.id);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
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

  toggleExpand(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }

  isExpanded(orderId: number): boolean {
    return this.expandedOrderId === orderId;
  }

  getStatusConfig(status: string) {
    return this.statusConfig[status?.toLowerCase()] ?? {
      label: status,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      dot: 'bg-slate-400'
    };
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || order.total_amount;
  }

  updateStatus(order: Order, newStatus: string) {
    if (order.status === newStatus) return;
    this.updatingStatusId = order.id;
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (updated) => {
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = { ...this.orders[idx], status: updated.status };
        this.updatingStatusId = null;
        this.showMessage(`Order #${order.id} status updated to ${newStatus}`, 'success');
      },
      error: (err) => {
        console.error('Status update failed', err);
        this.updatingStatusId = null;
        this.showMessage('Failed to update status. Please try again.', 'error');
      }
    });
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.statusMessage = { text, type };
    setTimeout(() => this.statusMessage = null, 3500);
  }
}
