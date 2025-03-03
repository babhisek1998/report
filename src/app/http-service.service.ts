import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private apiUrl = 'https://backend.ennomart.com/product/admin/upload';
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
  uploadProduct(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
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
