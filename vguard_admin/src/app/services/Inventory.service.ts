import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    apiUrl=environment.apiurl;
    m_apiUrl=environment.m_apiurl;
  constructor(private http:HttpClient) 
  { }

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
  async getHubs():  Promise<any> {
    return new Promise((resolve, reject) => {
  
      this.http.get(this.apiUrl+'products/gethubs').subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async getProducts(p_type:number):  Promise<any> {
    return new Promise((resolve, reject) => {
    let data=    {
            "ProductType":p_type
        }
      this.http.post(this.apiUrl+'products',data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async saveProduct(data:any):  Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'products/save',data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  //old one let check
  async saveHub(data:any):  Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'products/savehub',data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

//api//1000
getProductdetails(userid:number){
  return this.http.get(this.m_apiUrl+'product/get/'+userid)
}
}
