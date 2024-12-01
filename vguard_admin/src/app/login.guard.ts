import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the route is for the login page
    if (state.url.includes('/login')) {
      // If it's the login page, return true to allow access
      return true;
    } else {
      // If it's not the login page, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}