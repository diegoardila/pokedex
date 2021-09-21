import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Cookies from '../../../../node_modules/js-cookie';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  isLoginSubject = new BehaviorSubject<boolean>(this.isValidToken());

  constructor() { }

  handleData(token:string) {
    Cookies.set('auth_token', token);
  }
  getToken() {
    return Cookies.get('auth_token');
  }
  getUser() {
    return localStorage.getItem('user');
  }
  // Verify the token
  private isValidToken() {
    const token = this.getToken();
    const user = this.getUser();
    if (token && token !== 'undefined' && token !== null && token !== undefined&&user && user !== 'undefined' && user !== null && user !== undefined) {
      return true
    }else{      
      return false;
    }
  }
   // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    Cookies.remove('auth_token');
    localStorage.removeItem('user');
  }
}
