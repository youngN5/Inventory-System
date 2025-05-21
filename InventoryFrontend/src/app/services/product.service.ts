import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5087/products';

  constructor(private http: HttpClient) {}

  getAll(pageNumber?: number, pageSize?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (pageNumber != null && pageSize != null) {
      params = params.set('pageNumber', pageNumber.toString())
                     .set('pageSize', pageSize.toString());
    }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchProducts(name?: string, category?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }
}
