import { Component, OnInit, ChangeDetectorRef, signal, computed } from '@angular/core';
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
  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  orders = signal<Order[]>([]);
  isLoading = signal(true);
  expandedOrderId = signal<number | null>(null);
  updatingStatusId = signal<number | null>(null);
  statusMessage = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  readonly statusOptions = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];

  readonly statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    pending:    { label: 'Pending',    bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-400' },
    confirmed:  { label: 'Confirmed',  bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500'   },
    dispatched: { label: 'Dispatched', bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    delivered:  { label: 'Delivered',  bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500'  },
    cancelled:  { label: 'Cancelled',  bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-400'    }
  };

  sortedOrders = computed(() => {
    return [...this.orders()].sort((a, b) => a.id - b.id);
  });

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading.set(true);
    this.orderService.getAdminOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.isLoading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching orders', err);
        this.isLoading.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  toggleExpand(orderId: number) {
    this.expandedOrderId.set(this.expandedOrderId() === orderId ? null : orderId);
  }

  isExpanded(orderId: number): boolean {
    return this.expandedOrderId() === orderId;
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
    this.updatingStatusId.set(order.id);
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (updated) => {
        this.orders.update(orders => {
          const idx = orders.findIndex(o => o.id === order.id);
          if (idx !== -1) orders[idx] = { ...orders[idx], status: updated.status };
          return [...orders];
        });
        this.updatingStatusId.set(null);
        this.showMessage(`Order #${order.id} status updated to ${newStatus}`, 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Status update failed', err);
        this.updatingStatusId.set(null);
        this.showMessage('Failed to update status. Please try again.', 'error');
        this.cdr.detectChanges();
      }
    });
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.statusMessage.set({ text, type });
    setTimeout(() => {
      this.statusMessage.set(null);
      this.cdr.detectChanges();
    }, 3500);
  }
}
