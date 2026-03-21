import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/restaurant';
  
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('restaurantToken'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post<{access_token: string, token_type: string}>(`${this.apiUrl}/login`, data)
      .pipe(
        tap(response => {
          localStorage.setItem('restaurantToken', response.access_token);
          this.tokenSubject.next(response.access_token);
        })
      );
  }

  logout() {
    localStorage.removeItem('restaurantToken');
    this.tokenSubject.next(null);
  }
}
