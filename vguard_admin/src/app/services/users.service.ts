import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  visible:boolean;

apiUrl=environment.apiurl;
m_apiUrl=environment.m_apiurl;
  constructor(private http:HttpClient) 
  { 

    this.visible=false;
  }
hide(){
  this.visible=true;
}
show(){
  this.visible=false;
}
//duplicate 
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
  async getOrders(type:number):  Promise<any> {
    

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'orders/'+type).subscribe(
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
  return this.http.post(this.apiUrl+`/members/login`, data);
  }
  signup(data:any):Observable<any>{
    return this.http.post(this.m_apiUrl+`/members`,data)
  }
  uploadFile(file: File, userId: string, fileType: string):Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid', userId);
    formData.append('filetype', fileType);

    return this.http.post<any>(this.m_apiUrl+'upload/'+fileType, formData);
  }
  book(orderdata:any):Observable<any>{
    return this.http.post(this.m_apiUrl+'orders/orderbooking',orderdata)
  }
  getPriceData() {
    return this.http.get(this.m_apiUrl+'product/getPriceData')
  }
  // getordersummeryByBookingNo(bookingNo:string){
  //   let  bookingdata = {
  //       "BookingNo": bookingNo
  //     }
  //     return this.http.post(this.apiUrl+`getorderbyorderid/1004`,bookingdata);
  //   }
  getorder(order:any):Observable<any>{
    return this.http.get(this.m_apiUrl+'orders/getorderbyorderid/1004',order)
  }
  getnotification():Observable<any>{
    return this.http.get(this.apiUrl+'customers/getnotification')
  }
  savenotification(order:any):Observable<any>{
    return this.http.post(this.apiUrl+'customers/savenotification',order)
  }
  deleteNotification(id:number):Observable<any>{
    return this.http.get(this.apiUrl+'customers/deleteNotification/'+id)
  }
getMemberDetails(userid:number){
  return this.http.get(this.m_apiUrl+'members/'+userid)

}
getAlloffers(){
  return this.http.get(this.apiUrl+'orders/offers/getall');
}
cancelOrder(orderID:any){
  return this.http.get(this.apiUrl+'api/orders/cancelOrder/'+orderID);
}
savepromo(order:any):Observable<any>{
  return this.http.post(this.m_apiUrl+'admin/promocode/save',order)
}
saveUserTabAccess(item:any):Observable<any>{
  return this.http.post(this.apiUrl+'customers/saveUserTabAccess',item)
}
updatepromo(order:any):Observable<any>{
  return this.http.post(this.m_apiUrl+'admin/promocode/Update',order)
}
deletePromo(ID1:number,ID2:number){
  let payload=
    {
      "OfferID": ID1,
      "CouponID": ID2     
  }
  
  return this.http.post(this.m_apiUrl+`admin/promocode/remove`,payload);
}
getComplainsList(){
  return this.http.get(this.m_apiUrl+'admin/getComplains')
}
getorderByUserID(userid:number){
  return this.http.get(this.m_apiUrl+'orders/getorderbyUserid/'+userid)
}
getordersummeryByBookingNo(bookingNo:string){
  let  bookingdata = {
      "BookingNo": bookingNo
    }
    return this.http.post(this.m_apiUrl+`orders/getordersummeryByBookingNo`,bookingdata);
  }
  getBookingndUserSummaryByBookingID(bookingNo:string){
  let  bookingdata = {
      "BookingNo": bookingNo
    }
    return this.http.post(this.apiUrl+`orders/getBookingndUserSummaryByBookingID`,bookingdata);
  }

 
 
  getdasboarddata(){
    return this.http.get(this.apiUrl+'/customers/getDashboardData')
  }
  getadminUsers(){
    return this.http.get(this.apiUrl+'customers/getAdminUserList')
  }
  getadminUserdetails(userid:number){
    return this.http.get(this.apiUrl+'customers/getsecurityusers/'+userid)
  }

  

}
