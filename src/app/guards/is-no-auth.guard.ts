import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/auth/token.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IsNoAuthGuard implements CanActivate {
  session = false;
  browser = false;
  constructor(
    protected tokenService: TokenService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.session = this.tokenService.isLoggedIn();
    this.browser = isPlatformBrowser(platformId);
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.browser) {
      if (this.session) {
        window.location.href = '/dashboard';
        return false;
      }
      return !this.session;
    }
    return true;
  }
}