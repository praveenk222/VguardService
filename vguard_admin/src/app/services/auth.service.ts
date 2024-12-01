import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;

  login(userdata: any) {
    // Assume a successful login sets isAuthenticated to true
    this.isAuthenticated = true;
    this.loggedInStatus.next(true);

    // Save user information in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userdata));
  }

  logout() {
    this.isAuthenticated = false;

    // Remove user information from localStorage on logout
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  getCurrentUser() {
    // Retrieve user information from localStorage
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }
}
