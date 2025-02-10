import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../data-table/data-table.component';
@Component({
  selector: 'app-device-delivery-status',
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
  templateUrl: './device-delivery-status.component.html',
  styleUrl: './device-delivery-status.component.scss',
})
export class DeviceDeliveryStatusComponent {
  selectedOption: string = 'serialNumber';
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
    this.showTable_SlNo = true;
    this.onSubmit()
  }
  dataForTable = [
    {
      Slno: 1,
      DeviceID: 124124,
      MerchantName: 'Siddharth Sankar',
      VPAId: 'ASH22828',
      AWBNumber: 124124153,
      DeliveryStatus: 'Delivered',
      InstallationStatus: 'Installed',
      DateofInstallation: '19/06/2024',
      Action: 'Track',
    },
    {
      Slno: 2,
      DeviceID: 87629,
      MerchantName: 'Dev Darshan',
      VPAId: 'ASH22346',
      AWBNumber: 724124153,
      DeliveryStatus: 'Delivered',
      InstallationStatus: 'Installed',
      DateofInstallation: '19/06/2024',
      Action: 'Track',
    },
    {
      Slno: 3,
      DeviceID: 765325,
      MerchantName: 'Saumya Pattnaik',
      VPAId: 'ASH22858',
      AWBNumber: 424124153,
      DeliveryStatus: 'In Transit',
      InstallationStatus: 'To be installed',
      DateofInstallation: '29/06/2024',
      Action: 'Track',
    },
    {
      Slno:4,
      DeviceID: 124126,
      MerchantName: 'Rahul Sah',
      VPAId: 'ASH22827',
      AWBNumber: 124124653,
      DeliveryStatus: 'Not Dispatched',
      InstallationStatus: 'Not installed',
      DateofInstallation: '20/06/2024',
      Action: 'Track',
    },
  ];

  dataForTable_vpaId =[
    {
      Slno: 1,
      DeviceID: 124124,
      MerchantName: 'John Doe',
      VPAId: 'ASH22828',
      AWBNumber: 124124153,
      DeliveryStatus: 'Delivered',
      InstallationStatus: 'Installed',
      DateofInstallation: '19/06/2024',
      Action: 'Track',
    },
  ]
  dataForTable_slNo  =[
    {
      Slno: 1,
      DeviceID: 124124,
      MerchantName: 'John Doe',
      VPAId: 'ASH22828',
      AWBNumber: 124124153,
      DeliveryStatus: 'Delivered',
      InstallationStatus: 'Installed',
      DateofInstallation: '19/06/2024',
      Action: 'Track',
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
