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


  getLookupList():Observable<any>{
    return this.http.get(this.apiUrl+`members`)
  }
  createUser(data:any):Observable<any>{
    return this.http.post(this.apiUrl+`members`,data)
  }
  getAllUsers():Observable<any>{
    return this.http.get(this.apiUrl+`members`)
  }
  createProduct(data:any):Observable<any>{
    return this.http.post(this.apiUrl+`productMasters`,data)
  }
  getAllProducts():Observable<any>{
    return this.http.get(this.apiUrl+`productMasters`)
  }
  getProductdetails(id:number):Observable<any>{
    return this.http.get(this.apiUrl+`productMasters`)
  }
}
