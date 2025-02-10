import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataTableComponent } from './data-table/data-table.component';
@Component({
  selector: 'app-admin-device-management',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    DataTableComponent,
    ReactiveFormsModule
  ],
  templateUrl: './admin-device-management.component.html',
  styleUrl: './admin-device-management.component.scss'
})
export class AdminDeviceManagementComponent {

  selectedOption: string = 'date';
  showTable: boolean = false;
  showTable_vpa: boolean = false;
  showTable_SlNo: boolean = false;
  component: any = 'deliveryDevice';
  columns: any;

  dateForm: FormGroup;
  serialNumberForm: FormGroup;
  vpaIdForm: FormGroup;

  ngOnInit(): void {
    this.component = 'deliveryDevice';
  }
  dataForTable = [
    {
      Slno: 1,
      MerchantName: 'Shubham Pattanayak',
      MerchantID: 'SP028',
      DeviceSnNo : '809829919',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
    {
      Slno: 2,
      MerchantName: 'John Doe',
      MerchantID: 'Johnthedoe',
      DeviceSnNo : '809829919',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
    {
      Slno: 3,
      MerchantName: 'Swayam Mishra',
      MerchantID: 'Mishraji9912',
      DeviceSnNo : '429829912',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
    {
      Slno:4,
      MerchantName: 'Sambit Patra',
      MerchantID: 'Sambit912',
      DeviceSnNo : '809829919',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
  ];

  dataForTable_vpaId =[
    {
      Slno: 1,
      MerchantName: 'Shubham Pattanayak',
      MerchantID: 'SP028',
      DeviceSnNo : '809829919',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
  ]
  dataForTable_slNo  =[
    {
      Slno: 1,
      MerchantName: 'Shubham Pattanayak',
      MerchantID: 'SP028',
      DeviceSnNo : '809829919',
      VPAId: '4181@bob',
      DateCreated: '19/06/2024',
      UpdatedDate: '19/06/2024',
      Status: 'Mapped'
    },
  ]
  onSubmit() {
    this.showTable = true;
    this.columns = Object.keys(this.dataForTable[0]);
  }

  reset() {
    this.showTable = false;
  }

  onTransaction_SlNO_Submit() {
    this.showTable_SlNo = true;
    this.columns = Object.keys(this.dataForTable_slNo[0]);
  }
  onTransaction_VpaId_Submit() {
    this.showTable_vpa = true;
    this.columns = Object.keys(this.dataForTable_vpaId[0]);
  }

  showTable_on_radio() {
    this.showTable = false;
  }

}
