import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ShowuserDtableComponent } from '../showuser-dtable/showuser-dtable.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-showuser',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
    ShowuserDtableComponent,
    ReactiveFormsModule
  ],
  templateUrl: './showuser.component.html',
  styleUrl: './showuser.component.scss',
})
export class ShowuserComponent {
  showImage: boolean = true;
  showTableData:boolean = false;
  dataForTable= [];
  columns: string[];
  showUserForm: FormGroup;
  startDatevalue:any;
  endDateValue:any;
  bankUser:boolean = true;
  selectedOption:any;
  userType: string = JSON.parse(sessionStorage.getItem('dashboardData')).userType;

  constructor() {
    this.showUserForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  ngOnInit() {

  }

  bankUserData = [
    {
      'sl no.': '1',
      'Merchant Name': 'Debendra Patra',
      'Merchant Address': 'Pahala,bbsr',
      'Email Id': 'debendra@gmail.com',
      'Mobile no.': '89765456756',
      'Pincode': '754001'
    },
    {
      'sl no.': '2',
      'Merchant Name': 'Debendra Patra',
      'Merchant Address': 'Khandagiri,bbsr',
      'Email Id': 'debendra@gmail.com',
      'Mobile no.': '89765456756',
      'Pincode': '754001'
    },
    {
      'sl no.': '3',
      'Merchant Name': 'Ramesh Sahoo',
      'Merchant Address': 'Patia,bbsr',
      'Email Id': 'remesh@gmail.com',
      'Mobile no.': '89765456756',
      'Pincode': '754004'
    },
    {
      'sl no.': '4',
      'Merchant Name': 'Subham Pattanaik',
      'Merchant Address': 'Chandrasekhar Pur,bbsr',
      'Email Id': 'subham@gmail.com',
      'Mobile no.': '89765456756',
      'Pincode': '754002'
    },
    {
      'sl no.': '5',
      'Merchant Name': 'Gourav Das',
      'Merchant Address': 'Infocity,bbsr',
      'Email Id': 'gourav@gmail.com',
      'Mobile no.': '75365456756',
      'Pincode': '754009'
    },

  ];
  merchantUserData = [
    {
      'sl no.': '1',
      'Merchant Name': 'Debendra Patra',
      'User Name': 'DP001',
      'Email Id': 'debendra@gmail.com',
      'Mobile no.': '89765456756',
      'User role': 'Maker'
    },
    {
      'sl no.': '2',
      'Merchant Name': 'Gourav Patra',
      'User Name': 'GP776',
      'Email Id': 'gourav@gmail.com',
      'Mobile no.': '89765456756',
      'User role': 'Checker'
    },
    {
      'sl no.': '3',
      'Merchant Name': 'Ramesh Sahoo',
      'User Name': 'RAMESH01',
      'Email Id': 'remesh@gmail.com',
      'Mobile no.': '89765456756',
      'User role': 'Maker'
    },
    {
      'sl no.': '4',
      'Merchant Name': 'Subham Pattanaik',
      'User Name': 'SUBHAM9912',
      'Email Id': 'subham@gmail.com',
      'Mobile no.': '89765456756',
      'User role': 'Maker'
    },
    {
      'sl no.': '5',
      'Merchant Name': 'Gourav Das',
      'User Name': 'GOURAV201',
      'Email Id': 'gourav@gmail.com',
      'Mobile no.': '75365456756',
      'User role': 'Checker'
    },

  ];

  bankuser_option() {
    this.showImage = false;
    this.showTableData = false; 
    this.showUserForm.reset();
    this.bankUser = true;
    this.selectedOption = 'dateRange';
  }
  merchantuser_option() {
    this.showImage = false;
    this.showTableData = false;  
    this.showUserForm.reset();
    this.bankUser = false;
    this.selectedOption = 'dateRange';
  }
  searchSrno(){
    this.selectedOption = 'serialNumber'; 
    this.showTableData = false;   
   
  }
  searchVpano(){
    this.selectedOption = 'VPIid';
    this.showTableData = false;   
 
  }
  searchDate(){
    this.selectedOption = 'dateRange'; 
    this.showTableData = false;
  }

  showTable(){
    this.startDatevalue = this.showUserForm.get('startDate')?.value;
    this.endDateValue = this.showUserForm.get('endDate')?.value;
    console.log(this.startDatevalue,"this.startDatevalue");
    console.log(this.endDateValue,"this.endDateValue");  
    if(this.bankUser) {
      this.dataForTable=this.bankUserData;
    }
    else{
      this.dataForTable = this.merchantUserData;
    }
    this.columns =Object.keys(this.dataForTable[0]);
    this.fetchReport();   
  }



  fetchReport(){
    this.showImage = false; 
    this.showTableData = true;     
  }
}
