import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    DataTableComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.scss',
})
export class AdminReportsComponent implements OnInit {

  transactionForm: FormGroup;
  systemReportForm: FormGroup;

  component: any ;
  showTable: boolean = false;
  showTable1: boolean = false;
  columns: any;
  selectedTab: number = 0; 
  TransAndNotOrange ='../../../assets/images/admin/TransactionAndNotOrange.svg';
  TransAndNotGrey ='../../../assets/images/admin/TransactionAndNot.svg';
  SystemReportOrange ='../../../assets/images/admin/systemReportOrange.svg';
  SystemReortNotGrey ='../../../assets/images/admin/systemReportgrey.svg';

  selectedDeviceSlNo: string = '';
  selectedMonth: string = '';
  showDeviceReport: boolean = true;
  MQTT: boolean =false;
  MQTTshow : boolean = false;
  mqttForm: FormGroup;


  changeTabColor(event: MatTabChangeEvent) {
    this.selectedTab = event.index;
    this.showTable=false;
    this.showTable1 =false;
  }
  
  dataForTable1 = [

    {
      Slno: 1,
      Month: 'Sept 2024',
      DeviceSerialNumber: 153221,
      DeviceUptime: '100%',
      DeviceDowntime: '0%',
      UnscheduleDowntime : 0,
     
    },
    {
      Slno:2,
      Month: 'Aug 2024',
      DeviceSerialNumber: 153222,
      DeviceUptime: '100%',
      DeviceDowntime: '0%',
      UnscheduleDowntime : 0,
     
    },
    {
      Slno: 3,
      Month: 'Aug 2024',
      DeviceSerialNumber: 153225,
      DeviceUptime: '99%',
      DeviceDowntime: '1%',
      UnscheduleDowntime : 15,
     
    },

     ];

  dataForTable = [

    {
      Slno: 1,
      TransactionID: 122142544,
      Amount: '12,000.00',
      DeviceSerialNumber: 'ABXBJH97387',
      DateAndTime: '15.10.24 11:30',
      SoundplayStatus: 'failure',
      Reason: 'Device is offline',
     
    },
    {
      Slno: 2,
      TransactionID: 222142544,
      Amount: '10,000.00',
      DeviceSerialNumber: 'DBXBJH97387',
      DateAndTime: '18.10.24 12:30',
      SoundplayStatus: 'success',
      Reason:  'Device is online',
     
    },
    {
      Slno: 3,
      TransactionID: 132142544,
      Amount: '14,000.00',
      DeviceSerialNumber: 'CBXBJH97387',
      DateAndTime: '19.10.24 10:30',
      SoundplayStatus: 'success',
      Reason:  'Device is online',
     
    },
    {
      Slno: 4,
      TransactionID: 322142544,
      Amount: '15,000.00',
      DeviceSerialNumber: 'BBXBJH97387',
      DateAndTime: '10.10.24 12:30',
      SoundplayStatus: 'failure',
      Reason:  'Device is offline',
     
    },
  ];

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });

    this.systemReportForm = new FormGroup({
      deviceSlNo: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required)
    });
    this.mqttForm = new FormGroup({
      month: new FormControl('', Validators.required)
    });
  }
 

  onSubmit() {
    this.component = 'transactiondata';

    this.showTable=true;
    this.columns = Object.keys(this.dataForTable[0]);

  }
  onSubmit_system_report(){
    this.component = 'systemreports';
    const requestBody = {
      deviceSlNo: this.selectedDeviceSlNo,
      month: this.selectedMonth
    };
    this.showTable1=true;
    this.columns = Object.keys(this.dataForTable1[0]);
  }

  showTable_on_radio(e:any){
    console.log(e);
    if (e == 'mqtt') {
      this.MQTT = true;
      this.showDeviceReport =false;
      this.showTable1 = false;

} else {
  this.showDeviceReport = true;
  this.MQTT = false;
}
  }
  resetData(){
    this.showTable =false;
  }
}
