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
    let access_token: any = sessionStorage.getItem('access_token');
    console.log(access_token);
    if (req.url.startsWith('/users/login')) { //Staging
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
       }
      })
    }
    else if (req.url.includes('api/users')) { //Staging
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        }
      })
    }
    else if (req.url.includes('api/products')) { //Staging
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        }
      })
    }
    else if (req.url.endsWith('user/dashboard')) { //Staging
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        }
      })
    }
    return next.handle(req);
  }
}
