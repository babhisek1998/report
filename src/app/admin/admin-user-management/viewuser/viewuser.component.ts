import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShowuserDtableComponent } from '../showuser-dtable/showuser-dtable.component';
import { ViewuserDtableComponent } from '../viewuser-dtable/viewuser-dtable.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpServiceService } from '../../../http-service.service';
import { environment } from '../../../../environments/environment.development';
import { finalize } from 'rxjs';
import { hideLoader, showDynamicModal, showLoader, ToastUtility } from '../../../common-utility';
import moment from 'moment';


@Component({
  selector: 'app-viewuser',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    ViewuserDtableComponent,
    ReactiveFormsModule
  ],
  templateUrl: './viewuser.component.html',
  styleUrl: './viewuser.component.scss'
})
export class ViewuserComponent {

  showTableData: boolean = false;
  dataForTable = [];
  columns: string[];
  viewUserForm: FormGroup;
  startDatevalue: any;
  endDateValue: any;
  optionValue: any;
  private toastUtility = new ToastUtility();
  minimumDate1: any = new Date();
  somedate1 = new Date();
  somedate2: any = new Date();
  today: any = new Date();
  tcol: any;
  titles: any;
  displayedColumns: string[] = [];
  transformedDataForTable:any;


  constructor(private httpService: HttpServiceService) {
    this.viewUserForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      EndDate: new FormControl('', Validators.required),
      option: new FormControl('ALL', Validators.required),
    });
  }

  // responseData = [
  //   {
  //     'sl no.': '1',
  //     'Merchant Name': 'Ramesh Prusty',
  //     'Merchant Delivery Address': 'Patia,bbsr',
  //     'Email Id': 'ramesh@gmail.com',
  //     'Mobile no.': '98765456756',
  //     'Pincode': '754002',
  //     'State': 'odisha',
  //     'VPA Id': 'gskdybl',
  //     'Status': 'Rejected',
  //     'Reason for rejection': 'Details Missing',
  //   },
  //   {
  //     'sl no.': '2',
  //     'Merchant Name': 'subham sahoo',
  //     'Merchant Delivery Address': 'Chandrasekharpur,bbsr',
  //     'Email Id': 'subham@gmail.com',
  //     'Mobile no.': '98765467875',
  //     'Pincode': '754002',
  //     'State': 'odisha',
  //     'VPA Id': 'gskdybl',
  //     'Status': 'Pending',
  //     'Reason for rejection': 'Details Missing',
  //   },
  //   {
  //     'sl no.': '3',
  //     'Merchant Name': 'Debendra Patra',
  //     'Merchant Delivery Address': 'Pahala,bbsr',
  //     'Email Id': 'debendra@gmail.com',
  //     'Mobile no.': '89765456756',
  //     'Pincode': '754001',
  //     'State': 'odisha',
  //     'VPA Id': 'gskdybl',
  //     'Status': 'Approved',
  //     'Reason for rejection': 'NA',
  //   },
  //   {
  //     'sl no.': '4',
  //     'Merchant Name': 'Gourav Prusty',
  //     'Merchant Delivery Address': 'Mangalabag,CTC',
  //     'Email Id': 'gourav@gmail.com',
  //     'Mobile no.': '78987456756',
  //     'Pincode': '754002',
  //     'State': 'odisha',
  //     'VPA Id': 'gskdybl',
  //     'Status': 'Rejected',
  //     'Reason for rejection': 'Details Missing',
  //   },
  //   {
  //     'sl no.': '5',
  //     'Merchant Name': 'Siddharth Nayak',
  //     'Merchant Delivery Address': 'Khandagiri,bbsr',
  //     'Email Id': 'sidharth@gmail.com',
  //     'Mobile no.': '98765456756',
  //     'Pincode': '754005',
  //     'State': 'odisha',
  //     'VPA Id': 'gskdybl',
  //     'Status': 'Approved',
  //     'Reason for rejection': 'NA',
  //   },
  // ];

  saverange(res) {
    this.minimumDate1 = res.value;
    var nextWeek = moment(new Date(this.minimumDate1)).add(14, 'days');
    let addedDate = nextWeek.format('YYYY-MM-DD');
    this.somedate1 = this.minimumDate1;
    console.log(res,"res date");
    

    if (moment(nextWeek).isAfter(this.today)) {
      this.somedate2.setDate(this.today.getDate());
      console.log(this.somedate2,"somedate2");      
      this.viewUserForm.get('EndDate').setValue(this.somedate2);
    } else {
      this.somedate2 = new Date(addedDate);
      console.log(this.somedate2,"somedate2");    

      this.viewUserForm.get('EndDate').setValue(this.somedate2);
    }
  }

  showTable() {
    showLoader();
    this.startDatevalue = this.viewUserForm.get('startDate')?.value;
    this.endDateValue = this.viewUserForm.get('EndDate')?.value;
    this.optionValue = this.viewUserForm.get('option')?.value;
    const startdate = new Date(this.startDatevalue);
    this.startDatevalue = formatDate(startdate, 'yyyy-MM-dd', 'en');
    const endDate = new Date(this.endDateValue);
    this.endDateValue = formatDate(endDate, 'yyyy-MM-dd', 'en');
    let reqBody = {
      "startDate": this.startDatevalue,
      "endDate": this.endDateValue,
      "status": this.optionValue
    }

    this.httpService.post(environment.view_user, reqBody).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        this.displayedColumns=[];
        this.transformedDataForTable=[];
        hideLoader();
        this.dataForTable = res.data;
        if (this.dataForTable.length == 0) {
          showDynamicModal('NO DATA FOUND!!!!', 'FAILED', 'failure');
        }
        else if(this.dataForTable.length != 0){
          this.columns = Object.keys(this.dataForTable[0]);

          //adding for upper case
          this.tcol = (this.columns) ? this.columns : Object.keys(this.dataForTable[0]);
          for (let i = 0; i < this.tcol.length; i++) {
            let text = this.tcol[i];
            let result = text.replace(/([A-Z])/g, " $1");
            let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
            this.displayedColumns.push(finalResult);
          }
  
          // Utility function to convert display name to camelCase key
          const toCamelCase = (str: string) =>
            str.replace(/\s(.)/g, match => match[1].toUpperCase())
              .replace(/\s/g, '')
              .replace(/^(.)/, match => match.toLowerCase());
  
          // Map dataForTable to match display names in columns
          this.transformedDataForTable = this.dataForTable.map(item => {
            const newItem: { [key: string]: any } = {};
            this.displayedColumns.forEach(column => {
              const camelCaseKey = toCamelCase(column); // Convert display name to camelCase
              newItem[column] = item[camelCaseKey] || null; // Use value if present, otherwise null
            });
            return newItem;
          });
          console.log(this.transformedDataForTable,"transferData");        
          this.showTableData = true;
        }
      },
      error: (err: any) => {
        hideLoader();
        const errMsg =
          err.error.statusDesc ? err.error.statusDesc : 'Server Error, Please, try again.';
        this.toastUtility.show(errMsg, 'bg-danger', 2000);
      }
    })
  }
}
