import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../_models/product.model';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers:HttpHeaders;
  private url = "http://localhost:3000";

  
  constructor(private http_client:HttpClient) {
    this.headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');       
   }

   getProduct(): Observable<Product[]> {
    return this.http_client.get<any>(`${this.url}/products`, { headers: this.headers }).pipe(
      map((response: any) => {
        if (response.message && response.message === 'No products found') {
          // If the response contains a message indicating no products found, return an empty array
          return [];
        } else {
          // Otherwise, assume the response contains the products array
          return response as Product[]; // Assuming the response is an array of Product objects
        }
      }),
      catchError(() => {
        // Handle any errors that occur during the HTTP request
        return throwError('Error occurred while fetching products');
      })
    );
  }
   addProduct(product: Product) :Observable<Product>{
    console.log(product);
    return this.http_client.post<Product>(`${this.url}/products`,product)
   
  }

  updateProduct(product:Product):Observable<Product[]>{
    return this.http_client.put<Product[]>(`${this.url}/products`,product)
  }

  deleteProduct(id: number): Observable<{ message: string }> {
    return this.http_client.delete<{ message: string }>(`${this.url}/products/${id}`);
  }
}
