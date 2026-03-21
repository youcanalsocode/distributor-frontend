import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  /**
   * Fetch all categories (each includes its products list).
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  addCategory(formData: FormData): Observable<Category> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Category>(this.baseUrl, formData, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
