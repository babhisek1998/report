import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private router:Router) { }

  post(url: any, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  get(url: any) {
    return this.http.get(url);
  }
  put(url:any,reqbody:any){
      return this.http.put(url,reqbody)
  }

  logout() {
    // localStorage.clear();

    localStorage.removeItem(localStorage.getItem('user_name') + 'kyc');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
    localStorage.removeItem('brand_name');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('shop_name');
    localStorage.removeItem('columnCount');
    sessionStorage.clear();
    // window.location.href = `${domain}`;
    this.router.navigate(['/']);
  }
}
