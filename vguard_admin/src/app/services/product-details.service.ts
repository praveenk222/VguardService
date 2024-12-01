import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.apiurl;
  getProductDetails():Observable<any>{
   return this.http.get(this.baseUrl+`/products`)
  }
  getInventryCount():Observable<any>{
   return this.http.get(this.baseUrl+`/inventory`)
  }
  getProductDetailsById(id:number):Observable<any>{
   return this.http.get(this.baseUrl+`/products/${id}`)
  }
  addProduct(data:any):Observable<any>{
    return this.http.post(this.baseUrl+`/products`,data)
  }
  getMeasurement():Observable<any>{
    return this.http.get(this.baseUrl+`/mesurmentlookup`)
   }
   updateProduct(id: string, product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl+`/lookup/${id}`, product);
  }

  deleteProduct(product: any): Observable<void> {
    return this.http.post<any>(this.baseUrl+`/products`,product);
  }
}
