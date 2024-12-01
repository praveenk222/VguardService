import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl=environment.apiurl;
  constructor(private http:HttpClient) { }

  getorderDetails():Observable<any>{
   return this.http.get(this.apiUrl+`/orders`)
  }
  createOrder(data:any):Observable<any>{
    return this.http.post(this.apiUrl+`/orders`,data)
  }
}
