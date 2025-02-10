import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { APP_BASE_HREF, CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpServiceService } from '../../http-service.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { jwtDecode } from 'jwt-decode';
import { hideLoader, showLoader, ToastUtility } from '../../common-utility';
import { interval, take, takeWhile } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MessageService } from "primeng/api";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';

export interface NavItem {
  displayName?: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  parent?: boolean;
  children?: NavItem[];
  show?: string;
}

const navitems: NavItem[] = [
  {
    parent: false,
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard',
    show: '10'

  },
  {
    parent: false,
    displayName: 'Transaction Report',
    iconName: 'assignment',
    route: 'reports',
    show: '11'

  },
  {
    parent: false,
    displayName: 'Language Update',
    iconName: 'person add icon',
    route: 'language',
    show: '4'

  },
  {
    parent: false,
    displayName: 'Raise Issue',
    iconName: 'supervisor_account',
    route: 'helpdesk',
    show: '1'

  }
];



@Component({
  selector: 'app-merchant-main-container',
  standalone: true,
  imports: [SpinnerComponent, RouterOutlet, MatToolbarModule, CommonModule, RouterModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    NgOtpInputModule,
    ToastModule,
    OverlayPanelModule,
    PasswordModule,
    DividerModule,
    MatTreeModule,],
  templateUrl: './merchant-main-container.component.html',
  providers: [MessageService],

  styleUrl: './merchant-main-container.component.scss',
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('random', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('300ms ease-out')),
      transition('default => rotated', animate('300ms ease-in'))
    ])
  ]
})
export class MerchantMainContainerComponent implements OnInit {
  topnavImg = '../assets/images/loginpage/bank_of_baroda_logo.svg.png';
  _mobileQueryListener: () => void;
  _mobileQueryListener1: () => void;
  mobileQueryTablet: any;
  step: number = 0;
  mobileQuery: any;
  isMenuOpen: boolean = true
  demo: any;
  sidenavWidth: number = 16;
  state: string = 'default';
  storeprivileges: string;
  onhover: boolean = false;
  test: any;
  active: boolean = false;
  login_user: any;
  toggle: boolean = true;
  closeExpandedNavBtn: boolean = false;
  totalnotifycount: string = '0';
  visible: boolean = false;
  private toastUtility = new ToastUtility();

  changepassword_show: boolean = false;

  otp_sent: boolean = true;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  new_pass_err: boolean = false;
  new_pass_err1: boolean = false;
  new_pass_err2: boolean = false;
  con_pass_err: boolean = false;
  flag: boolean = false;
  flag2: boolean = false;
  timeLeft: number;
  disableResend: boolean = false;
  start_timer: boolean;
  showPassword: boolean;
  showPassword1: boolean;
  showPassword2: boolean;
  ch_password: FormGroup;
  otpValue: any;
  otpValid: boolean;
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  constructor(changeDetectorRef: ChangeDetectorRef, private router: Router, private httpService: HttpServiceService,
    media: MediaMatcher) {
    // change password form
    this.ch_password = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,}$'
        ),
      ]),
      con_password: new FormControl('', [Validators.required]),
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryTablet = media.matchMedia('(max-width: 820px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this._mobileQueryListener1 = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQueryTablet.addListener(this._mobileQueryListener1);
    this.demo = navitems;
  }
  ngOnInit() {
    if (!sessionStorage.getItem('CORE_SESSION')) {
      this.httpService.logout();
    } else {
      let sessionData: any = sessionStorage.getItem('CORE_SESSION');
      var decoded_data: any = jwtDecode(sessionData);
      if (decoded_data.isPasswordResetRequired) {
        this.showDialog();
      }
    }
  }

  check_feature(id: any) {
    if (this.storeprivileges.includes(id)) {
      return true;
    } else {
      return false
    }

  }

  rotateIcon(index: number) {
    this.active = true;
    this.test = index;
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  setStep(index: number) {
    this.step = index;
  }

  increase() {
    this.sidenavWidth = 16;

  }
  decrease() {
    this.sidenavWidth = 4;
  }

  btnClick() {
    this.toggle = !this.toggle;
  }

  ToggleClick() {
    this.closeExpandedNavBtn = !this.closeExpandedNavBtn;

  }

  logout() {
    this.httpService.logout();
  }

  showDialog() {
    this.changepassword_show = true;
  }


  chngpasswordlogout() {
    let sessionData: any = sessionStorage.getItem('CORE_SESSION');
    var decoded_data: any = jwtDecode(sessionData);
    if (decoded_data.isPasswordResetRequired) {
      this.httpService.logout();
    }
    else {
      this.changepassword_show = false;
      this.router.navigateByUrl("/merchant/dashboard");
    }
  }

  //cahnge password

  onOtpChange(otp: any) {
    this.otpValue = otp;
    if (otp.length < 6) {
      this.otpValid = true;
    } else {
      this.otpValid = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }


  startTimer() {
    this.disableResend = true;
    this.start_timer = true;
    const timerStart = interval(1000);
    const waitSeconds = 31;
    timerStart
      .pipe(
        take(waitSeconds),
        takeWhile(() => {
          this.timeLeft = 30;
          return this.start_timer;
        })
      ) // It will unsubscribe when the "startTimer" will be false.
      .subscribe((timer) => {
        this.timeLeft = 30 - timer;
        if (this.timeLeft === 0) {
          this.disableResend = false;
          this.start_timer = false;
        }
      });
  }

  pass_input1(event: any) {
    var evt = event.target.value;
    var new_password = this.ch_password.get('new_password')?.value;
    if (new_password != '' && evt == new_password) {
      this.new_pass_err = true;
      this.flag = false;
    } else {
      this.new_pass_err = false;
      this.flag = true;
    }
  }

  pass_input2(event: any) {
    var evt = event.target.value;
    var old_password = this.ch_password.get('old_password')?.value;
    var con_password = this.ch_password.get('con_password')?.value;
    if (old_password != '' && evt == old_password) {
      this.new_pass_err = true;
      this.flag = false;
    } else {
      this.new_pass_err = false;
      this.flag = true;
    }
    if (con_password != null && con_password != '' && evt != con_password) {
      this.con_pass_err = true;
      this.flag2 = false;
    } else {
      this.con_pass_err = false;
      this.flag2 = true;
    }
  }
  pass_input3(event: any) {
    var evt = event.target.value;
    var new_password = this.ch_password.get('new_password')?.value;
    if (evt != '' && evt == new_password) {
      this.con_pass_err = false;
      this.flag2 = true;
    } else {
      this.con_pass_err = true;
      this.flag2 = false;
    }
  }

  sendOtp() {
    showLoader();
    let reqBody = {
      newPassword: this.ch_password.get('new_password').value,
      oldPassword: this.ch_password.get('old_password').value,
    };

    this.httpService.post(environment.send_otp, reqBody).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res.statusCode == -1) {
          this.ch_password.reset();
          this.toastUtility.show(res.statusDesc, 'bg-danger', 3000);
        } else {
          this.otp_sent = false;
          this.toastUtility.show(res.statusDesc, 'bg-success', 3000);
          this.startTimer();
        }
      },
      error: (err: any) => {
        hideLoader();
        let e = err.error.statusDesc ? err.error.statusDesc : err.error.message;
        this.toastUtility.show(e, 'bg-danger', 3000);
        this.ch_password.reset();
      },
    });
  }

  validateOtp() {
    showLoader();
    let reqBody = {
      newPassword: this.ch_password.get('new_password').value,
      oldPassword: this.ch_password.get('old_password').value,
      otp: this.otpValue,
    };

    this.httpService.post(environment.change_password, reqBody).subscribe({
      next: (res: any) => {
        hideLoader();
        if (res.statusCode == -1) {
          this.toastUtility.show(res.statusDesc, 'bg-danger', 3000);
          this.ngOtpInput.setValue('');
        } else {
          this.toastUtility.show(res.statusDesc, 'bg-success', 3000);

          setTimeout(() => {
            var domain = 'http://' + sessionStorage.getItem('logouturl');
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = `${domain}`;
            this.router.navigate['/'];
          }, 1500);
        }
      },
      error: (err: any) => {
        hideLoader();
        let e = err.error.statusDesc ? err.error.statusDesc : err.error.message;
        this.toastUtility.show(e, 'bg-danger', 3000);
        this.ngOtpInput.setValue('');
      },
    });
  }


  goToProfile() {
    this.router.navigateByUrl("/merchant/profile");
  }
}
