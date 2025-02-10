import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { hideLoader, showDynamicModal, showLoader } from '../../../common-utility';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-merchant',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, NgIf, HttpClientModule,CommonModule
  ],
  templateUrl: './create-merchant.component.html',
  styleUrl: './create-merchant.component.scss'
})
export class CreateMerchantComponent {
  merchantForm: FormGroup;
  showSingle: boolean = true;
  constructor(private http: HttpClient) {
    this.merchantForm = new FormGroup({
      merchantName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[6-9][0-9]{9}$/)]),
      vpaId: new FormControl('', Validators.required),
      qrString: new FormControl('', Validators.required),
      merchantAdd: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      typeDevice: new FormControl('', Validators.required),
    })
  }
  
  ngoninit() {

  }

  RadioMerchant(e: any) {
    if (e == '1') {
      this.showSingle = true
    } else {
      this.showSingle = false
    }
  }

  getState(e: any) {
    console.log(e.target.value);
    if (e.target.value.length == 6) {
      this.fetchCityandState(e.target.value)
    }
  }

  Create_Merchant() {
    showLoader();
    let adminUserName = JSON.parse(sessionStorage.getItem('dashboardData')).adminName;
    let reqBody = {
      "merchantName": this.merchantForm.get('merchantName').value,
    "email": this.merchantForm.get('email').value,
    "mobileNumber": this.merchantForm.get('mobile').value,
    "role" : "ROLE_RETAILER",
    "vpaId" : this.merchantForm.get('vpaId').value,
    "merchantDeliveryAddress": this.merchantForm.get('merchantAdd').value,
    "state" : this.merchantForm.get('state').value,
    "pincode" : this.merchantForm.get('pincode').value,
    "qrString" : this.merchantForm.get('qrString').value,
    "qrType" : this.merchantForm.get('typeDevice').value

    }
  
    let url = environment.createMerchant;
    this.http.post(url, reqBody).subscribe({
      next: (data:any) => {
        hideLoader();
        console.log(data);
        showDynamicModal(data.statusDesc, 'SUCCESS', 'success');
        this.merchantForm.reset();

      },
      error: error => {
        hideLoader();
        showDynamicModal(error.error.statusDesc ? error.error.statusDesc : 'Server Error', 'FAILED', 'failure');
      },
      complete: () => {
        hideLoader();
        console.log('Operation complete');
      }
    })

  }

  CancelForm() {
    this.merchantForm.reset();
  }

  fetchCityandState(e: any) {
    showLoader();
    const stateArray = [{ statecode: 'AN', statename: 'Andaman & Nicobar' }, { statecode: 'AP', statename: 'Andhra Pradesh' }, { statecode: 'AR', statename: 'Arunachal Pradesh' },
    { statecode: 'AS', statename: 'Assam' }, { statecode: 'BR', statename: 'Bihar' }, { statecode: 'CH', statename: 'Chandigarh' }, { statecode: 'CG', statename: 'Chhattisgarh' },
    { statecode: 'DN', statename: 'Dadra and Nagar Haveli' }, { statecode: 'DD', statename: 'Daman & Diu' }, { statecode: 'DL', statename: 'Delhi' },
    { statecode: 'GA', statename: 'Goa' }, { statecode: 'GJ', statename: 'Gujarat' }, { statecode: 'HR', statename: 'Haryana' }, { statecode: 'HP', statename: 'Himachal Pradesh' },
    { statecode: 'JK', statename: 'Jammu & Kashmir' }, { statecode: 'JH', statename: 'Jharkhand' }, { statecode: 'KA', statename: 'Karnataka' }, { statecode: 'KL', statename: 'Kerala' },
    { statecode: 'LD', statename: 'Lakshadweep' }, { statecode: 'MP', statename: 'Madhya Pradesh' }, { statecode: 'MH', statename: 'Maharashtra' }, { statecode: 'MN', statename: 'Manipur' },
    { statecode: 'ML', statename: 'Meghalaya' }, { statecode: 'MZ', statename: 'Mizoram' }, { statecode: 'NL', statename: 'Nagaland' }, { statecode: 'OR', statename: 'Odisha' },{ statecode: 'OD', statename: 'Odisha' },
    { statecode: 'PY', statename: 'Puducherry' }, { statecode: 'PB', statename: 'Punjab' }, { statecode: 'RJ', statename: 'Rajasthan' }, { statecode: 'SK', statename: 'Sikkim' },
    { statecode: 'TN', statename: 'Tamil Nadu' }, { statecode: 'TG', statename: 'Telangana' }, { statecode: 'TR', statename: 'Tripura' }, { statecode: 'UP', statename: 'Uttar Pradesh' },
    { statecode: 'UK', statename: 'Uttarakhand' }, { statecode: 'WB', statename: 'West Bengal' }];

    let reqBody = {
      "pin": parseInt(e)
    }
    let url = environment.pincode;
    this.http.post(url, reqBody).subscribe((res: any) => {
      hideLoader();
      let state = res.data.data.state;
      let mystate = stateArray.filter(item => item.statecode === state);
      this.merchantForm.patchValue({
        state: mystate[0].statename
      })


    },
      (err: any) => {
        hideLoader();
        showDynamicModal('Server Error !!!', 'FAILED', 'failure');
        console.log('Server Error');
      }
    )
  }


}
