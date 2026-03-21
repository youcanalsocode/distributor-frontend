import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  restaurant_id: number;
  restaurant_name?: string;
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

  getAdminOrders(): Observable<Order[]> {
    if (this.ordersCache) {
      return of(this.ordersCache);
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Order[]>(this.baseUrl, { headers }).pipe(
      tap(data => this.ordersCache = data)
    );
  }

  createOrder(orderData: any): Observable<Order> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('restaurantToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Order>(this.baseUrl, orderData, { headers }).pipe(
      tap(() => this.ordersCache = null)
    );
  }
}
