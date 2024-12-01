import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  showHead:boolean=false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private router:Router){
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
       
          if (event['url'] == '/' ||  event['url'] == '/login') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
        
      });
    }
}
