import { ChangeDetectorRef, Component } from '@angular/core';
import { PhoneVerificationComponent } from '../phone-verification/phone-verification.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { VerificationCompleteComponent } from '../verification-complete/verification-complete.component';
import { HttpServiceService } from '../../http-service.service';
import { showLoader, hideLoader, showDynamicModal, hideDynamicModal, ToastUtility } from '../../common-utility';
import { NumberOnlyDirective } from '../../directives/onlyNumber.directive';
import { NoWhitespaceDirective } from '../../directives/noWhiteSPace.directive';
import Toastify from 'toastify-js';
import { environment } from '../../../environments/environment.development';
import { finalize } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [PhoneVerificationComponent, SpinnerComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ForgotPasswordComponent,
    MatIconModule,
    NumberOnlyDirective,
    NoWhitespaceDirective,
    VerificationCompleteComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  show: boolean = false;
  topnavImg = '../assets/images/loginpage/topicon.png';
  loginForm: FormGroup;
  fieldTypePass: boolean = true;
  fieldTypePass2: boolean = true;
  loaderImg: any = '../../../assets/images/loading.svg';
  loading: boolean = false;
  loginshow: boolean = true;
  page: string = 'loginPage';
  totalnotifycount: string = '0';
  closeExpandedNavBtn: boolean = false;
  expandContract: boolean = true;
  private toastUtility = new ToastUtility();
  positionNew: any;
  locatonGeoFlag: boolean = false;
  user_name: string = '';
  admin_name: string = '';
  mobile_num: string = '';
  email_id: string = '';
  user_type: string = '';
  rememberMe: boolean = false;
  cookies_username: any;
  messageFromChild: string;



  constructor(private router: Router, private cookie: CookieService, private cdr: ChangeDetectorRef, private httpService: HttpServiceService) {

  }
  ngOnInit(): void {
    this.watchLocation();
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.cookies_username = this.cookie.get('username') ? this.cookie.get('username') : null;
    if (this.cookies_username != null) {
      this.loginForm.get('username')?.setValidators(null);
      this.loginForm.get('username')?.updateValueAndValidity();
    }
  }

  togglePass() {
    this.fieldTypePass = !this.fieldTypePass;
  }
  forgotpass() {
    this.page = 'forgotpassword';
    this.changePage('forgotpassword');

    this.loginshow = false;
    this.show = true;
  }

  submitLogin() {
    this.loading = true;
  }

  changePage(newPage: string) {
    this.page = newPage;
    this.cdr.detectChanges();
  }

  goToVerification() {
    this.changePage('phoneVerification');
  }
  async loginAPI() {
    showLoader();
    await this.watchLocation();
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    console.log(this.cookies_username);

    if (this.cookies_username) {
      params.set('username', this.cookies_username);
    }
    else {
      params.set('username', this.loginForm.get('username')?.value);
    }
    params.set('password', this.loginForm.get('password')?.value);
    this.httpService.post(environment.login, params.toString()).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res) {
          let token: any = jwtDecode(res.access_token);
          let logouturl = window.location.host;
          let access_token = res.access_token;
          let refresh_token = res.refresh_token;
          let exp = res.exp;


          let adminname = res.adminName;
          sessionStorage.setItem('refresh_token', refresh_token);
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('exp', exp);
          localStorage.setItem('admin_name', adminname);
          this.cookie.set('admin_name', adminname);
          sessionStorage.setItem('loginInfo', JSON.stringify(res));
          sessionStorage.setItem('CORE_SESSION', res.access_token);
          sessionStorage.setItem('logouturl', logouturl);
          let role = token.authorities[0];
          sessionStorage.setItem('userType', role);
          this.cookie.set('user_name', this.loginForm.get('username')?.value);
          if (this.rememberMe) {
            this.cookies_username ? this.cookie.set('username', this.cookies_username) : this.cookie.set('username', this.loginForm.value.username);
          } else {
            this.cookie.delete('username');
          }

          this.dashBoard(role);


        }

      },
      error: (err: any) => {
        hideLoader();
        const errMsg =
          err.error.error_description ? err.error.error_description : 'Server Error, Please, try again.';
        this.toastUtility.show('Login Failed: ' + errMsg, 'bg-danger', 2000);
      }
    })

  }

  async dashBoard(role: any) {
    showLoader();
    this.httpService.get(environment.dashboardapi).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        this.user_name = res.userInfo.userName;
        this.admin_name = res.userInfo.adminName;
        this.mobile_num = res.userInfo.userProfile.mobileNumber;
        this.email_id = res.userInfo.userProfile.email;
        this.user_type = res.userInfo.userType;

        if (
          this.user_type == 'ROLE_ADMIN') {
          sessionStorage.setItem('UserData', JSON.stringify(res));
        } else if (this.user_type == 'ROLE_RETAILER') {
          localStorage.setItem('shop_name', res.userInfo.userProfile.shopName);
          sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        }
        sessionStorage.setItem(
          'privileges',
          JSON.stringify(res.userInfo.privileges)
        );
        localStorage.setItem('user_type', res.userInfo.userType);
        localStorage.setItem('user_name', res.userInfo.userName);
        localStorage.setItem('brand_name', res.userInfo.userBrand);
        sessionStorage.setItem('dashboardData', JSON.stringify(res.userInfo));
        this.navigateToUser(role);
      },
      error: (err: any) => {
        hideLoader();
        this.toastUtility.show(
          'Something went wrong. Try login again.',
          'bg-danger',
          2000
        );
      }
    })
  }

  navigateToUser(role: any) {
    console.log(role);

    hideLoader();
    this.toastUtility.show('Login successful.', 'bg-success', 5000);
    let storeprivileges = [];
    switch (role) {
      case 'ROLE_ADMIN':
        storeprivileges = [];
        sessionStorage.setItem('storeprivileges',JSON.stringify( storeprivileges))
        this.router.navigate(['/admin/dashboard']);
        break
      case 'ROLE_BOB_CHECKER':
        storeprivileges = ['7','18'];
        sessionStorage.setItem('storeprivileges',JSON.stringify( storeprivileges))
        this.router.navigate(['/admin/dashboard']);
        break
      case 'ROLE_BOB_MAKER':
         storeprivileges = ['7'];
        sessionStorage.setItem('storeprivileges',JSON.stringify( storeprivileges))
        this.router.navigate(['/admin/dashboard']);

    break;
  case 'ROLE_RETAILER':
    this.router.navigate(['merchant/dashboard']);
    break;
}
  }


  async watchLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.positionNew = position.coords;
          let { latitude, longitude } = this.positionNew;
          localStorage.setItem(
            'lctnCordn',
            btoa(JSON.stringify({ latitude, longitude }))
          );
          this.locatonGeoFlag = false;
        },
        (error) => {
          this.locatonGeoFlag = false;
          if (error.code === 1) {
            this.locatonGeoFlag = true;
            this.locationAlerts(false, error.message);
          } else if (error.code === 2) {
            let { latitude, longitude } = {
              latitude: '20.34118',
              longitude: '85.80679',
            };
            localStorage.setItem(
              'lctnCordn',
              btoa(JSON.stringify({ latitude, longitude }))
            );
          }
        }
      );
    } else {
      this.locatonGeoFlag = true;
      this.locationAlerts(true, '');
    }
  }
  locationAlerts(type: any, msg: any) {
    let notify: any;
    let alertHtml = type;
    if (alertHtml) {
      let modalpop: any = document.getElementById('myModal3');
      modalpop.style.display = 'flex';
    } else {
      this.toastUtility.show(
        `Error: ${msg}`,
        'bg-danger',
        2000
      ); let modalpop: any = document.getElementById('myModal3');
      modalpop.style.display = 'flex';
    }
  }

  notify(options: { message: string; status: string }) {
    Toastify({
      text: options.message,
      duration: 5000,
      className:
        options.status === 'success'
          ? 'toastr-base toastr-success'
          : 'toastr-base toastr-error',
      close: true,
    }).showToast();
  }

  checkRememberMe(e: any) {
    this.rememberMe = e.target.checked;
  }
  resetUserForm() {
    this.loginForm.reset();
    this.cookies_username = null;
    this.cookie.delete('username');
  }

  receiveMessage($event: string) {
    this.messageFromChild = $event;  // Store the message received from the child    
  }

}
