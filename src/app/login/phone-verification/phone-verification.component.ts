import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { HttpServiceService } from '../../http-service.service';
import { showLoader, hideLoader, showDynamicModal, hideDynamicModal, ToastUtility } from '../../common-utility';
import { NumberOnlyDirective } from '../../directives/onlyNumber.directive';
import { NoWhitespaceDirective } from '../../directives/noWhiteSPace.directive';
import { environment } from '../../../environments/environment.development';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-phone-verification',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgOtpInputModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './phone-verification.component.html',
  styleUrl: './phone-verification.component.scss',
})
export class PhoneVerificationComponent implements OnInit {
  ngOnInit(): void {
    this.Timer(60);
  }
  constructor(private router: Router, private httpService: HttpServiceService) {

  }

  loaderImg: any = '../../../assets/images/loading.svg';
  @ViewChild(NgOtpInputComponent, { static: false })
  otp: string = '';
  otpDisable: boolean = true;
  display: any = 60;
  showTimerText: boolean = true;
  timerInterval: any;
  @Input() changePage!: (page: string) => void;
  deblChange: boolean = true;
  private toastUtility = new ToastUtility();
  @Input() usernameFromParent: string = '';
  maskPhoneNum: any;

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  loading: Boolean = false;
  onOtpChange(otp: any) {
    this.otp = otp;
    if (otp.length < 6) {
      this.otpDisable = true;
    }
    else {
      this.otpDisable = false;
    }
  }
  sendTempPasw() {
    showLoader();
    let reqBody = {
      "userName": this.usernameFromParent,
      "otp": this.otp,
    }
    this.httpService.post(environment.verifyforgotpasswordAPI, reqBody).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res.statusCode == 0) {
          this.toastUtility.show(res.statusDesc, 'bg-success', 2000);
          this.changePage('sucesspage');
        } else if (res.statusCode == -1) {
          this.toastUtility.show(res.statusDesc, 'bg-danger', 2000);
          this.ngOtpInput.setValue('');
        } else {
          this.toastUtility.show('Something went wrong, Please try again.', 'bg-danger', 2000);
          this.ngOtpInput.setValue('');
        }
      },
      error: (err: any) => {
        hideLoader();
        const errMsg = (err.error.error_description != null) ? err.error.error_description : 'Server Error, Please, try again.';
        this.toastUtility.show(errMsg, 'bg-danger', 2000);
        this.ngOtpInput.setValue('');
      }
    })
  }

  sendForgotPswOtp() {
    this.ngOtpInput.setValue('');
    showLoader();
    this.httpService.post(environment.forgotpasswordAPI + this.usernameFromParent, {}).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res.statusCode == 0) {
          this.Timer(60);
          const message = res.statusDesc;
          const countryCodeIndex = message.indexOf("+91");
          if (countryCodeIndex !== -1) {
            const phoneNumber = message.substring(countryCodeIndex, message.length);
            this.maskPhoneNum = phoneNumber;
          } else {
            console.log("Phone number not found in the message.");
          }
          this.toastUtility.show(res.statusDesc, 'bg-success', 2000);
        } else if (res.statusCode == -1) {
          this.toastUtility.show(res.statusDesc, 'bg-danger', 2000);

        } else {
          this.toastUtility.show('Something went wrong, Please try again.', 'bg-danger', 2000);
        }
      },
      error: (err: any) => {
        hideLoader();
        const errMsg = err.error.error_description ?? 'Server Error, Please, try again.';
        this.toastUtility.show(errMsg, 'bg-danger', 2000);
      }
    })
  }


  Timer(second: any) {
    this.deblChange = false;
    this.showTimerText = true;
    let seconds: number = second;
    let textSec: any = '0';
    let statSec: number = seconds;
    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else {
        statSec == 0
      } if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;
      this.display = `${textSec}`;
      if (seconds == 0) {
        clearInterval(this.timerInterval);
        this.deblChange = true;
        this.showTimerText = false;
      }
    }, 1000);
  }
}
