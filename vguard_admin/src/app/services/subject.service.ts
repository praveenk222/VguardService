import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8080/api/v1/adminweb/'; // Replace with your API URL
  private _dataSubject = new BehaviorSubject<any>(null);
  private _lookupSubject = new BehaviorSubject<any>(null);
  data$: Observable<any> = this._dataSubject.asObservable();
  Lookupdata$: Observable<any> = this._lookupSubject.asObservable();


  constructor(private http: HttpClient) { }
  async fetchMasterData() {
    if (!this._dataSubject.getValue()) { // Prevent unnecessary API calls
      const response = await this.http.get<any>(`${this.apiUrl}products/gethubs`).toPromise();
      this._dataSubject.next(response);
    }
  }
 
async fetchLookup(){
  if(!this._lookupSubject.getValue()){
    const response=await this.http.get<any>(`${this.apiUrl}products/getLookup`).toPromise();
    this._lookupSubject.next(response)
  }
}





}
