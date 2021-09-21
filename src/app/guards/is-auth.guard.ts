import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AuthStateService } from '../services/auth/auth-state.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {
  public isAuth:any;
  browser: any;

  constructor(
    private authService: AuthService,
    private authState: AuthStateService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.browser = isPlatformBrowser(platformId);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.browser) {
      this.authState.userAuthState.subscribe(val => {
        this.isAuth = val;
      });
      console.log(this.isAuth)
      if (!this.isAuth) {        
        window.location.href = '/';;
      }
      return this.isAuth;
    }
    return true;
  }
}
