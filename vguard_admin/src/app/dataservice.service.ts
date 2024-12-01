import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  constructor() { }
  private combinedDataSubject = new BehaviorSubject<any>(null);
  public combinedData$ = this.combinedDataSubject.asObservable();

  setCombinedData(data: any) {
    this.combinedDataSubject.next(data);
  }
}
