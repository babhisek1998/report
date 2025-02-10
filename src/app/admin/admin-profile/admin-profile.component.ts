import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [MatIcon, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
  userForm: FormGroup;
  isReadonly: boolean = true;
  responseData: any;
  usertype: any;
  isAdmin: boolean = false;
  isRetailer: boolean = false;
  username: any;
  name: any;
  phonenumber: any;
  emailId: any;
  address: any;
  userData: any = JSON.parse(sessionStorage.getItem('dashboardData')).userProfile;

  constructor(private httpService: HttpServiceService, private router: Router) {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phNo: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      devicetype: new FormControl(''),
      model: new FormControl(''),
      srno: new FormControl(''),
      networkinfo: new FormControl(''),
      number: new FormControl('')
    })
  }

  async ngOnInit() {
    this.username = this.userData.userName;
    this.fetchProfileData();
  }

  saveData() {
    this.isReadonly = true;
  }

  openEdit() {
    this.isReadonly = false;
    console.log(this.isReadonly, "isreadonly");
  }
  fetchProfileData() {
    this.userForm.patchValue({
      name: this.userData['firstName'] + " " + this.userData['lastName'],
      phNo: this.userData['mobileNumber'],
      email: this.userData['email'],
      address: this.userData['address'] ? this.userData['address'] : 'Infocity, Bhubaneswar',
      devicetype: "Sound Box (UPI QR) with NFC (With Display)",
      model: "ET 123",
      srno: "23563256",
      networkinfo: "BSNL",
      number: "9864654678",
    })
  }

  goToDashboard(){
    this.router.navigateByUrl("/merchant/dashboard");
  }
}
