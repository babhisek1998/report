import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {



  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let access_token: any = sessionStorage.getItem('access_token');
    // console.log(access_token);


    //  if (req.url.startsWith('https://oauth2-auth-server-csc-admin-prod.txninfra.com')) { //Prod
    // // if (req.url.startsWith('https://services.iserveu.online/dev/BOB/authorization/oauth/token')) { //Staging
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/x-www-form-urlencoded',
    // //       'Authorization': `Basic aXN1LWtvdGFrLWNsaWVudDppc3Uta290YWstcGFzc3dvcmQ=`
    // //     }
    // //   })
    // // }
    // // else if (req.url.endsWith('user/dashboard')) { //Staging
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // // }
    // // else if(req.url.startsWith('https://apidev.iserveu.online/BOB/bank-user')){
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // // }
    // // else if(req.url.endsWith('user/register-bob-retailer')){
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // // }
    // // else if(req.url.endsWith('user/update-password-using-old-password') || req.url.endsWith('user/send-change-password-otp')){
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // // }
    // // else if(req.url.includes('/BOB/bank-user/fetchuserlist')){
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // // }
    // // else if(req.url.includes('status-update')){
    // //   req = req.clone({
    // //     setHeaders: {
    // //       'Content-Type': 'application/json',
    // //       'Authorization': access_token
    // //     }
    // //   })
    // }
    return next.handle(req);
  }
}
