import { ChangeDetectorRef, Component } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpServiceService } from '../../http-service.service';
import { showLoader, hideLoader, showDynamicModal, hideDynamicModal, ToastUtility } from '../../common-utility';
import { NumberOnlyDirective } from '../../directives/onlyNumber.directive';
import { NoWhitespaceDirective } from '../../directives/noWhiteSPace.directive';
import Toastify from 'toastify-js';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgOtpInputModule } from 'ng-otp-input';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ SpinnerComponent,
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
    MatIconModule,
    NgOtpInputModule,
    NumberOnlyDirective,
    NoWhitespaceDirective],
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
  otpValue: string = '';

  otpConfig = {
    length: 6,
    inputStyles: { width: '40px', height: '40px' },
    allowNumbersOnly: true
  };

  constructor(private fb: FormBuilder,private _http:HttpServiceService,private router:Router) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit mobile number validation
      mpin: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onOtpChange(otp: string) {
    this.otpValue = otp;
    this.loginForm.patchValue({ mpin: otp });
  }

  loginAPI() {
    if (this.loginForm.valid) {
      let reqbody = {
        mobileNumber:this.loginForm.get('mobile').value,
        mpin:this.loginForm.get('mpin').value
      }
       this._http.post(environment.login,reqbody).subscribe({
        next:(res:any)=>{
           console.log(res);
           this.router.navigateByUrl('/admin/dashboard')
        },
        error:(err:any)=>{
             console.log(err);
             this.router.navigateByUrl('/admin/dashboard')
             
        }
       })
      // this.loading = true;
      // console.log('Logging in with:', this.loginForm.value);
      // setTimeout(() => {
      //   this.loading = false;
      //   alert('Login successful!');
      // }, 2000);
    }
  }
}
