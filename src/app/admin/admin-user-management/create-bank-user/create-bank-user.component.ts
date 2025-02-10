import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { showLoader,hideLoader, showDynamicModal } from '../../../common-utility';
@Component({
  selector: 'app-create-bank-user',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,NgIf,HttpClientModule,CommonModule
  ],
  templateUrl: './create-bank-user.component.html',
  styleUrl: './create-bank-user.component.scss'
})
export class CreateBankUserComponent {
  createUser: FormGroup;
  constructor(private http : HttpClient){
    this.createUser = new FormGroup({
      firstname: new FormControl ('',Validators.required),
      lastname: new FormControl ('',Validators.required),
      email: new FormControl ('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobile: new FormControl ('',[Validators.required, Validators.minLength(10),Validators.pattern(/^[6-9][0-9]{9}$/)]),
      username: new FormControl ('',Validators.required),
      user_role: new FormControl ('',Validators.required),

    });
  }

  ngonInit() {
  }

  onlyAlphabet(event) {
    return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122
  }

  Create(){
    showLoader();
    let adminUserName = JSON.parse(sessionStorage.getItem('dashboardData')).adminName;
    
    let reqBody =
    {
      "userName": this.createUser.get('username').value,
      "firstName": this.createUser.get('firstname').value,
      "lastName": this.createUser.get('lastname').value,
      "email": this.createUser.get('email').value,
      "roleId": parseInt(this.createUser.get('user_role').value),
      "mobileNumber": this.createUser.get('mobile').value,
      "state": "Odisha",
      "userType": "TRANSACTIONAL",
      "adminUserName": adminUserName,
      "parentUserName": adminUserName
      
  }
  let url = environment.createuser;
  this.http.post(url,reqBody).subscribe({
    next: data => {
      hideLoader();
      console.log(data);
      showDynamicModal('User Created Successfully !!!!','SUCCESS','success');
      this.createUser.reset();

    },
    error: error => {
      hideLoader();
      showDynamicModal( error.error.message? error.error.message : 'Server Error','FAILED','failure');
    },
    complete: () => {
      hideLoader();
      console.log('Operation complete');
    }
  })
  
  }

  CancelForm(){
    this.createUser.reset();
  }

}
