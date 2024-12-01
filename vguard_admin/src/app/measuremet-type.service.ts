import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasuremetTypeService {
  constructor(private http: HttpClient) {}
  apiUrl=environment.apiurl;
  // POST request to create a new lookup
  createLookup(newLookup: any): Observable<any> {
    return this.http.post(this.apiUrl+`/lookup`, newLookup);
  }

  // GET request to retrieve lookups
  getLookups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+`/lookup`);
  }
  getmesurmentLookups(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+`/mesurmentlookup`);
  }
}
