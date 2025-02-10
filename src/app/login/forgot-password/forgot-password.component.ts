import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
import { showLoader, hideLoader, showDynamicModal, hideDynamicModal, ToastUtility } from '../../common-utility';
import { NumberOnlyDirective } from '../../directives/onlyNumber.directive';
import { NoWhitespaceDirective } from '../../directives/noWhiteSPace.directive';
import { environment } from '../../../environments/environment.development';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NumberOnlyDirective,
    NoWhitespaceDirective,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  forgetPassForm: FormGroup;
  loading: boolean = false;
  loaderImg: any = '../../../assets/images/loading.svg';
  @Input() changePage!: (page: string) => void;
  @Output() messageEvent = new EventEmitter<string>();
  maskPhoneNum: any;
  private toastUtility = new ToastUtility();


  constructor(private router: Router, private httpService: HttpServiceService) {

  }

  ngOnInit(): void {
    this.forgetPassForm = new FormGroup({
      username: new FormControl('', Validators.required),
    });
  }

  changePageParentCall(newPage: string) {
    if (typeof this.changePage === 'function') {
      this.changePage(newPage);
    } else {
      console.error('changePage is not properly bound:', this.changePage);
    }
  }
  sendForgotPswOtp() {
    showLoader();
    this.httpService.post(environment.forgotpasswordAPI + this.forgetPassForm.get('username')?.value, {}).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res.statusCode == 0) {
          this.messageEvent.emit(this.forgetPassForm.get('username')?.value);  // Emit the message to the parent
          this.changePageParentCall('phoneVerification');
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
        console.log(err);
        
        const errMsg = err.error.error_description ?err.error.error_description: 'Server Error, Please, try again.';
        this.toastUtility.show(errMsg, 'bg-danger', 2000);
      }
    })

  }
  gotoLogin() {
    this.changePageParentCall('loginPage')
  }


}
