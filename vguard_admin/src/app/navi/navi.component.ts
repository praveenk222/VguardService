import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit {
  showHead: boolean=false;
menu:any;
menuById:any;
  constructor(private router: Router,private us:UsersService,private overlay:OverlayContainer) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/'  || event['url'] == '/changepassword' ) {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
        
      });
      // router.events.forEach((event) => {
      //   if (event instanceof NavigationStart) {
      //     if (event['url'] == '/changepassword') {
      //       this.showHead = false;
      //     } else {
      //       // console.log("NU")
      //       this.showHead = true;
      //     }
      //   }
        
      // });
      this.get()
    }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    // menu=[
  
      // {name:'Dashboard',icon:'home',link:'/dashboard',},
      // {name:'Booking history',icon:'bookmark',link:'/bookinghistory'},
      // {name:'Revenue',icon:'attach_money',link:'/revenue'},
      // {name:'Manual booking',icon:'work',link:'/manualbooking'},
      // {name:'Inventory',icon:'invert_colors',link:'/inventory'},
      // {name:'price management',icon:'insert_chart',link:'/bookingpricedata'},
      // {name:'Manage customers',icon:'supervised_user_circle',link:'/customers'},
      // {name:'Promo codes',icon:'local_offer',link:'/promodata'},
      // {name:'Push notifications',icon:'notification_important',link:'/pushnotification'},
      // {name:'Complains',icon:'markunread_mailbox',link:'/complains'},
    
    // ]

get(){
  this.us.getnavlist().subscribe((res:any)=>{
    this.menu=res
    console.log(res)
  })
}
getnavbyId(){
  this.us.getNavById(100).subscribe((res:any)=>{
    this.menuById=res
    console.log(res)
  })
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


}
