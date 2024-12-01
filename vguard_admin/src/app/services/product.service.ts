import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = environment.apiurl;
  constructor(private http: HttpClient) { }

  async getProducts(producttype: number): Promise<any> {
    let data = {
      "ProductType": producttype
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'products', data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async getOrders(type: number): Promise<any> {


    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'orders/' + type).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  loginAdmin(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `customers/adminLogin`, data);
  }
  lookupList(data: any): Observable<any> {
    return this.http.get(this.apiUrl + `/products/getLookup`);
  }
  getProductDetailsbyId(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `products/get/`+id)
  }
}
