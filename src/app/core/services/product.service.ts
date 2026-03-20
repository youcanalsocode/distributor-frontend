import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/products`;

  /**
   * Fetch all products from the backend.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(products => products.map(p => this.formatProductImage(p)))
    );
  }

  /**
   * Fetch a single product by its ID.
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map(product => this.formatProductImage(product))
    );
  }

  /**
   * Helper to ensure image_url is an absolute path.
   */
  private formatProductImage(product: Product): Product {
    if (product.image_url && !product.image_url.startsWith('http')) {
      return {
        ...product,
        image_url: `${environment.apiUrl}${product.image_url}`
      };
    }
    return product;
  }
}
