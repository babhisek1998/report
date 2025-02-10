import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../data-table/data-table.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-languageupdate',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule,DataTableComponent,
  MatInputModule,FormsModule,MatNativeDateModule,MatIconModule,TableModule,ReactiveFormsModule],
  templateUrl: './languageupdate.component.html',
  styleUrl: './languageupdate.component.scss'
})
export class LanguageupdateComponent {
  dateRange:boolean = false;
  serialNumberSearch:boolean = true;
  vpaIdSearch:boolean = false;
  component:any = 'languageUpdate';
  showAction:boolean = true;
  compName:boolean;
  showTableData:boolean = false;
  languageForm: FormGroup;
  startDatevalue:any;
  endDateValue:any;

  constructor() {
    this.languageForm = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }

  responseData = 
  [
    {
        "serial number": "38231120750082",
        "Merchant Id": "QS2",
        "Name": "InActive",
        "Mobile": "98765678654",
        "VPA ID": "test_demo",
        "Language": "English",
    },
    {
        "serial number": "WQRJ002235000288",
        "Merchant Id": "QS2",
        "Name": "InActive",
        "Mobile": "876545678765",
        "VPA ID": "test_demo",
        "Language": "English",
    },
    {
        "serial number": "WQRJ002235000288",
        "Merchant Id": "QS2",
        "Name": "InActive",
        "Mobile": "87654345678",
        "VPA ID": "test_demo",
        "Language": "English",
    },

  ]

  dataForTable= [];
  columns: string[];


  ngOnInit() {
    this.dataForTable=[];
    this.fetchReport();
  }
  openDaterange(){
    this.serialNumberSearch = false;
    this.vpaIdSearch = false;
    this.dateRange = true;
    this.showTableData = false;

  }
  openSerialNumberSearch(){
    this.dateRange = false;
    this.vpaIdSearch = false;
    this.serialNumberSearch = true;
    this.showTableData = false;

  }
  openVpaIdSearch(){
    this.dateRange = false;
    this.serialNumberSearch = false;
    this.vpaIdSearch = true;
    this.showTableData = false;

  }

  showTable(){
    this.showTableData = true;
    this.startDatevalue = this.languageForm.get('startDate')?.value;
    this.endDateValue = this.languageForm.get('endDate')?.value;  

  }

  fetchReport(){
    this.dataForTable=this.responseData;
    this.columns =Object.keys(this.dataForTable[0]);
    console.log(this.dataForTable,"data for table");
    console.log(this.columns,"columns for table");
  }


}
