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
import { HttpServiceService } from '../../http-service.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { hideLoader, showLoader, ToastUtility } from '../../common-utility';
import { environment } from '../../../environments/environment.development';
import { interval, Observable, take, takeWhile } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgOtpInputComponent, NgOtpInputModule } from 'ng-otp-input';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from "primeng/api";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import {MatSelectModule} from '@angular/material/select';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DtableComponent } from '../dtable/dtable.component';
export interface NavItem {
  displayName?: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  parent?: boolean;
  children?: NavItem[];
  show?: string;
  type?: boolean;
  tokenAuth?: boolean,

}

const navitems: NavItem[] = [
  {
    parent: false,
    displayName: 'Dashboard',
    iconName: 'dashboard', // No change, already appropriate
    route: 'dashboard',
    show: 'N/A',
    type:true
  },
  {
    parent: false,
    displayName: 'Users',
    iconName: 'group', // Changed from 'computer' to 'group' for user management
    route: 'users',
    show: 'N/A',
    type: true
  },
  {
    parent: true,
    displayName: 'Products',
    iconName: 'category', // Changed from 'supervised_user_circle' to 'category' for products
    show: 'N/A',
    type:true,
    children: [
      {
        parent: false,
        displayName: 'View',
        iconName: 'visibility', // Changed from 'verified_user' to 'visibility' for viewing
        route: 'product/view',
        show: 'N/A',
        type:true
      },
      {
        parent: false,
        displayName: 'Add',
        iconName: 'add_circle', // Changed from 'person_pin' to 'add_circle' for adding
        route: 'product/add',
        show: 'N/A',
        type:true
      },
      {
        parent: false,
        displayName: 'Others',
        iconName: 'more_horiz', // Changed from 'supervisor_account' to 'more_horiz' for others/miscellaneous
        route: 'product/others',
        show: 'N/A',
        type: true
      }
    ]
  },
  {
    parent: true,
    displayName: 'Lead Manager',
    iconName: 'assignment', // Changed from 'inventory' to 'assignment' for lead management
    // route: 'leadmanager',
    show: 'N/A',
    type:true,
    children: [
      {
        parent: false,
        displayName: 'row lead',
        iconName: 'visibility', // Changed from 'verified_user' to 'visibility' for viewing
        route: 'leadmanager/row-lead',
        show: 'N/A',
        type:true
      },
      {
        parent: false,
        displayName: 'proper lead',
        iconName: 'add_circle', // Changed from 'person_pin' to 'add_circle' for adding
        route: 'leadmanager/proper-lead',
        show: 'N/A',
        type:true
      }
    ]
  },
  {
    parent: false,
    displayName: 'Feature',
    iconName: 'star', // Changed from 'shopping_cart' to 'star' for features
    route: 'feature',
    show: 'N/A',
    type:true
  }
  // Uncomment and update icons for the following if needed:
  // {
  //   parent: false,
  //   displayName: 'Reports',
  //   iconName: 'bar_chart', // Changed from 'assessment' to 'bar_chart' for reports
  //   route: 'reports',
  //   show: '13',
  //   type: true
  // },
  // {
  //   parent: false,
  //   displayName: 'TMS',
  //   iconName: 'folder', // Changed from 'folder_open' to 'folder' for TMS
  //   route: 'https://isutms.web.app/',
  //   show: '19',
  //   tokenAuth: true,
  //   type: true
  // },
  // {
  //   parent: false,
  //   displayName: 'Help & Support',
  //   iconName: 'live_help', // Changed from 'support' to 'live_help' for help
  //   route: 'helpdesk',
  //   show: '17',
  //   type: true
  // },
  // {
  //   parent: false,
  //   displayName: 'Notification Center',
  //   iconName: 'notifications', // Changed from 'notifications_active' to 'notifications' for notifications
  //   route: 'notifications',
  //   show: '19',
  //   type: true
  // }
];

@Component({
  selector: 'app-admin-main-container',
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
    OverlayPanelModule,
    MatExpansionModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    MatFormFieldModule,
    ToastModule,
    ConfirmDialogModule,
    RatingModule,
    NgOtpInputModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
    PasswordModule,
    DividerModule,
    MatTreeModule, MatAutocompleteModule],
  templateUrl: './admin-main-container.component.html',
  styleUrl: './admin-main-container.component.scss',
  providers: [MessageService],
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

export class AdminMainContainerComponent implements OnInit {
  topnavImg = '../assets/images/loginpage/topicon.png';
  _mobileQueryListener: () => void;
  _mobileQueryListener1: () => void;
  mobileQueryTablet: any;
  step: number = 0;
  mobileQuery: any;
  isMenuOpen: boolean = true
  demo: any;
  sidenavWidth: number = 17;
  state: string = 'default';
  private toastUtility = new ToastUtility();
  storeprivileges: string;
  onhover: boolean = false;
  test: any;
  active: boolean = false;
  login_user: any;
  toggle: boolean = true;
  closeExpandedNavBtn: boolean = false;
  totalnotifycount: string = '0';
  visible: boolean = false;
  changepassword_show: boolean = false;
  categories = ['Users', 'Products'];
  selectedCategory = '';

  foodItems = [
    { viewValue: 'Apple' },
    { viewValue: 'Banana' },
    { viewValue: 'Carrot' },
    { viewValue: 'Milk' },
    { viewValue: 'Cheese' }
  ];

  searchText = '';
  filteredFoods = this.foodItems;
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
    media: MediaMatcher, private http: HttpClient) {
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
    }
  );
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryTablet = media.matchMedia('(max-width: 820px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this._mobileQueryListener1 = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQueryTablet.addListener(this._mobileQueryListener1);
    // this.storeprivileges = (sessionStorage.getItem('storeprivileges'));
    this.demo = navitems;
  }
  ngOnInit() {
    // if (!sessionStorage.getItem('CORE_SESSION')) {
    //   this.httpService.logout();
    // } else {
    //   let sessionData: any = sessionStorage.getItem('CORE_SESSION');
    //   var decoded_data: any = jwtDecode(sessionData);
    //   if (decoded_data.isPasswordResetRequired) {
    //     this.showDialog();
    //   }
    // }
  }

  showDialog() {
    this.changepassword_show = true;
  }
  filterFoods() {
    this.filteredFoods = this.foodItems.filter(food =>
      food.viewValue.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  check_feature(id: any) {
  return true
    // if (this.storeprivileges.includes(id)) {
    //   return false;
    // } else {
    //   return true
    // }

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
    this.sidenavWidth = 17;

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
  chngpasswordlogout() {
    // let sessionData: any = sessionStorage.getItem('CORE_SESSION');
    // var decoded_data: any = jwtDecode(sessionData);
    // if (decoded_data.isPasswordResetRequired) {
    //   this.httpService.logout();
    // }
    // else {
    //   this.changepassword_show = false;
    //   this.router.navigateByUrl("/admin/dashboard");
    // }
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
    // showLoader();
    // let reqBody = {
    //   newPassword: this.ch_password.get('new_password').value,
    //   oldPassword: this.ch_password.get('old_password').value,
    // };

    // this.http.post(environment.send_otp, reqBody).subscribe({
    //   next: (res: any) => {
    //     hideLoader();
    //     if (res.statusCode == -1) {
    //       this.ch_password.reset();
    //       this.toastUtility.show(res.statusDesc, 'bg-danger', 3000);
    //     } else {
    //       this.otp_sent = false;
    //       this.toastUtility.show(res.statusDesc, 'bg-success', 3000);
    //       this.startTimer();
    //     }
    //   },
    //   error: (err: any) => {
    //     hideLoader();
    //     let e = err.error.statusDesc ? err.error.statusDesc : err.error.message;
    //     this.toastUtility.show(e, 'bg-danger', 3000);
    //     this.ch_password.reset();
    //   },
    // });
  }

  validateOtp() {
    // showLoader();
    // let reqBody = {
    //   newPassword: this.ch_password.get('new_password').value,
    //   oldPassword: this.ch_password.get('old_password').value,
    //   otp: this.otpValue,
    // };

    // this.http.post(environment.change_password, reqBody).subscribe({
    //   next: (res: any) => {
    //     hideLoader();
    //     if (res.statusCode == -1) {
    //       this.toastUtility.show(res.statusDesc, 'bg-danger', 3000);
    //       this.ngOtpInput.setValue('');
    //     } else {
    //       this.toastUtility.show(res.statusDesc, 'bg-success', 3000);

    //       setTimeout(() => {
    //         var domain = 'http://' + sessionStorage.getItem('logouturl');
    //         localStorage.clear();
    //         sessionStorage.clear();
    //         window.location.href = `${domain}`;
    //         this.router.navigate['/'];
    //       }, 1500);
    //     }
    //   },
    //   error: (err: any) => {
    //     hideLoader();
    //     let e = err.error.statusDesc ? err.error.statusDesc : err.error.message;
    //     this.toastUtility.show(e, 'bg-danger', 3000);
    //     this.ngOtpInput.setValue('');
    //   },
    // });
  }


  goToProfile() {
    this.router.navigateByUrl("/admin/profile");
  }

  goToTms(){
    // window.open('https://isutms.web.app/');
  }
}
