import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Masterservice } from './masterservice';

@Injectable({
  providedIn: 'root'
})
export class ResolvegurdService implements Resolve<any> {
constructor(private ms:Masterservice){

}
  resolve() { 
    return this.ms.gethubs();
  }
}
