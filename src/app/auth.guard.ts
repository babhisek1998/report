import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastUtility } from './common-utility';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  logOutTimer: any;
  private toastUtility = new ToastUtility();
  constructor(private router: Router) { }
  canActivate(): boolean {
    if (sessionStorage.getItem('access_token')) {
      this.logout();
      return false;
    }
    if (sessionStorage.getItem('access_token')) {
      const decToken: { exp: number; created: number } = jwtDecode(
        sessionStorage.getItem('access_token')
      );
      const startDate = new Date();
      const expDate = new Date(decToken.exp * 1000);
      const session = Math.ceil(<any>expDate - <any>startDate);
      // const mins = Math.floor((session/1000)/60);
      if (expDate <= startDate) {
        this.logout();
        return false;
      }
      if (this.logOutTimer) {
        clearTimeout(this.logOutTimer);
        return true;
      }
      this.logOutTimer = setTimeout(() => {
        // window.removeEventListener('offline', this.handleOffline, true);
        this.logout();
        return false;
      }, session);
    }
    return true;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
