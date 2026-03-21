import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/categories`;
  private categoriesCache: Category[] | null = null;

  /**
   * Fetch all categories (each includes its products list).
   */
  getCategories(): Observable<Category[]> {
    if (this.categoriesCache) {
      return of(this.categoriesCache);
    }
    return this.http.get<Category[]>(this.baseUrl).pipe(
      tap(data => this.categoriesCache = data)
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  addCategory(formData: FormData): Observable<Category> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Category>(this.baseUrl, formData, { headers }).pipe(
      tap(() => this.categoriesCache = null)
    );
  }

  updateCategory(id: number, formData: FormData): Observable<Category> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Category>(`${this.baseUrl}/${id}`, formData, { headers }).pipe(
      tap(() => this.categoriesCache = null)
    );
  }

  deleteCategory(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/${id}`, { headers }).pipe(
      tap(() => this.categoriesCache = null)
    );
  }
}
