import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.tokenSubject.next(localStorage.getItem('restaurantToken'));
    }
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/restaurant/register`, data);
  }

  login(data: any) {
    return this.http.post<{access_token: string, token_type: string, name: string, address: string}>(`${this.apiUrl}/restaurant/login`, data)
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('restaurantToken', response.access_token);
            localStorage.setItem('restaurantName', response.name);
            localStorage.setItem('restaurantAddress', response.address || '');
          }
          this.tokenSubject.next(response.access_token);
        })
      );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('restaurantToken');
      localStorage.removeItem('restaurantName');
      localStorage.removeItem('restaurantAddress');
    }
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('restaurantToken');
    }
    return false;
  }

  adminLogin(data: any) {
    return this.http.post<{access_token: string, token_type: string}>(`${this.apiUrl}/admin/login`, data)
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('adminToken', response.access_token);
          }
        })
      );
  }

  adminLogout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('adminToken');
    }
  }

  isAdminLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('adminToken');
    }
    return false;
  }

  getRestaurantName(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('restaurantName');
    }
    return null;
  }

  getRestaurantAddress(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('restaurantAddress');
    }
    return null;
  }
}
