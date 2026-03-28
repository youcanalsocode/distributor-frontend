import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-restaurant-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-orders.component.html'
})
export class RestaurantOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  isLoading = true;
  expandedOrderId: number | null = null;
  errorMessage: string | null = null;

  readonly statusConfig: Record<string, { label: string; bg: string; text: string; dot: string; icon: string }> = {
    pending:    { label: 'Pending',    bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-400', icon: 'fa-clock'            },
    confirmed:  { label: 'Confirmed',  bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500',   icon: 'fa-check-circle'     },
    dispatched: { label: 'Dispatched', bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500', icon: 'fa-truck'            },
    delivered:  { label: 'Delivered',  bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500',  icon: 'fa-box-open'         },
    cancelled:  { label: 'Cancelled',  bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-400',    icon: 'fa-times-circle'     }
  };

  get sortedOrders(): Order[] {
    return [...this.orders].sort((a, b) => a.id - b.id);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;
    this.errorMessage = null;
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.errorMessage = 'Could not load your orders. Please try again.';
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
      dot: 'bg-slate-400',
      icon: 'fa-circle'
    };
  }

  // order of progression steps used by the timeline
  private readonly progressOrder = ['pending', 'confirmed', 'dispatched', 'delivered'];

  isCurrentOrPastStatus(currentStatus: string, step: string): boolean {
    const currentIdx = this.progressOrder.indexOf(currentStatus.toLowerCase());
    const stepIdx = this.progressOrder.indexOf(step.toLowerCase());
    return currentIdx >= 0 && stepIdx >= 0 && stepIdx <= currentIdx;
  }

  getOrderTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || order.total_amount;
  }
}
