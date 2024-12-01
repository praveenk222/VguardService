import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import{filter} from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'EverAdminPanel';
  private sidenav: MatSidenav;
code:number;
  public isMenuOpen = true;
constructor(private breakpointObserver: BreakpointObserver,private overlay:OverlayContainer,private http:HttpClient){
  this.isMenuOpen = false;

}
  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }
  ngDoCheck() {
    if (this.isHandset) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }      
}
ngOnInit() {
  this.toggleControl.valueChanges.subscribe(
    (darkMode:any)=>{
      this.className= darkMode ? this.darkClassName : this.lightClassName;
      if(darkMode){
        this.overlay.getContainerElement().classList.add(this.darkClassName);

      }else{
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }

    }
    
  )





}
toggleControl = new FormControl(false);
@HostBinding('class')  className = '';
darkClassName = 'theme-dark';
lightClassName = 'theme-light';
pincode(){
 
}
// handle(event:any){console.log(this.code.toString().length)
//   if(this.code.toString().length == 6){
//   this.http.get(`https://api.postalpincode.in/pincode/${this.code}`).subscribe((res:any)=>{
//     console.log(res)
//   })
// }
// }



}
