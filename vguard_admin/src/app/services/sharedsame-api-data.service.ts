import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedsameApiDataService {
  m_apiUrl=environment.m_apiurl;

  constructor(private http: HttpClient) {}
  getTodosList() {
    return this.http.get(this.m_apiUrl+'products/getLookup').pipe(shareReplay());
  }
  getHubList() {
    return this.http.get('http://localhost:8080/api/hubs/get').pipe(shareReplay());
  }
}
