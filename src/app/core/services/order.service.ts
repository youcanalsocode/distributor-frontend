import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  id: number;
  product_id: number;
  product_name?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  restaurant_id: number;
  restaurant_name?: string;
  restaurant_address?: string;
  restaurant_phone?: string;
  restaurant_email?: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/orders`;
  private ordersCache: Order[] | null = null;

  private getAdminHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAdminOrders(): Observable<Order[]> {
    if (this.ordersCache) {
      return of(this.ordersCache);
    }
    return this.http.get<Order[]>(this.baseUrl, { headers: this.getAdminHeaders() }).pipe(
      tap(data => this.ordersCache = data)
    );
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    this.ordersCache = null;
    return this.http.patch<Order>(
      `${this.baseUrl}/${orderId}/status`,
      { status },
      { headers: this.getAdminHeaders() }
    );
  }

  private getRestaurantHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('restaurantToken') : '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/my`, { headers: this.getRestaurantHeaders() });
  }

  createOrder(orderData: any): Observable<Order> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('restaurantToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Order>(this.baseUrl, orderData, { headers }).pipe(
      tap(() => this.ordersCache = null)
    );
  }
}
