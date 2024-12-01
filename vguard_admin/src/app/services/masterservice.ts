import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Masterservice {
  visible:boolean;

apiUrl=environment.apiurl;
m_apiUrl=environment.m_apiurl;
  constructor(private http:HttpClient) 
  { 

  }

  async getUsers():  Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'customers').subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  loginAdmin(data:any):Observable<any>{
  return this.http.post(this.apiUrl + `customers/adminLogin`, data);
  }
  signup(data:any):Observable<any>{
    return this.http.post(this.m_apiUrl+`members`,data)
  }
  
gethubs(){
  return this.http.get(this.apiUrl+'products/gethubs');
}

 

}
