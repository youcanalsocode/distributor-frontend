import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/restaurant';
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.tokenSubject.next(localStorage.getItem('restaurantToken'));
    }
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post<{access_token: string, token_type: string}>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('restaurantToken', response.access_token);
          }
          this.tokenSubject.next(response.access_token);
        })
      );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('restaurantToken');
    }
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('restaurantToken');
    }
    return false;
  }
}
