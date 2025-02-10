import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from './data-table/data-table.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-inventory-status',
  standalone: true,
  imports: [MatIconModule, MatButtonModule,  MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    DataTableComponent,
    ReactiveFormsModule],
  templateUrl: './admin-inventory-status.component.html',
  styleUrl: './admin-inventory-status.component.scss'
})
export class AdminInventoryStatusComponent {

  selectedOption: string = 'single';
  showTable: boolean = false;
  showTable_vpa: boolean = false;
  showTable_SlNo: boolean = false;
  component: any = 'deliveryDevice';
  successUpload:string='../assets/images/admin/undraw_collaboration_re_vyau 1.png';
  columns: any;
  page:string='Inventory';
  dateForm: FormGroup;
  serialNumberForm: FormGroup;
  vpaIdForm: FormGroup;
  singleForm:FormGroup;
  @ViewChild('uploadMessage', { static: true })
  public uploadMessage: TemplateRef<any>;
  dataForTable = [
    {
      "Sl no": 1,
      "Type Of Device": "SB (Display)",
      "No Of Device": 12424,
      "Zone/Region": 'East',
      "Address": 'Chandrashekharpur , Near Infocity Chowk',
      "PIN": '751012',
    },
    {
      "Sl no": 2,
      "Type Of Device": "SB (NFC)",
      "No Of Device": 124124,
      "Zone/Region": 'East',
      "Address": 'Chandrashekharpur , Near Infocity Chowk',
      "PIN": '751012',
    },
    {
      "Sl no": 3,
      "Type Of Device": "SB (Display & QR)",
      "No Of Device": 24124,
      "Zone/Region": 'West',
      "Address": 'Patia,Bhubaneswar',
      "PIN": '751012',
    },
    {
      "Sl no": 4,
      "Type Of Device": "SB (Display)",
      "No Of Device": 124224,
      "Zone/Region": 'West',
      "Address": 'Chandrashekharpur , Near Infocity Chowk',
      "PIN": '751012',
    },
    {
      "Sl no": 5,
      "Type Of Device": "SB (NFC & QR)",
      "No Of Device": 124124,
      "Zone/Region": 'West',
      "Address": 'Chandrashekharpur , Near Infocity Chowk',
      "PIN": '751012',
    },

  ];

  ngOnInit() {
    this.component = 'deliveryDevice';
    this.showTable = true;
    this.columns = Object.keys(this.dataForTable[0]);
    
    this.singleForm = new FormGroup({
      typeDevice:new FormControl('deviceType',Validators.required),
      numberOfDevice:new FormControl('',Validators.required),
      zone:new FormControl('zone',Validators.required),
      addressLine1:new FormControl('',Validators.required),
      addressLine2:new FormControl('',Validators.required),
      pincode:new FormControl('',Validators.required)
    })
  }
  constructor(private dialog: MatDialog){}


  onSubmit() {
    this.showTable = true;
    this.columns = Object.keys(this.dataForTable[0]);
  }

  reset() {
    this.showTable = false;
  }

  showTable_on_radio() {
    this.showTable = false;
  }

  gotoSingle(){
    this.selectedOption='single';
    this.page='Order';
  }

  openconfirmModal() {    
    this.dialog.open(this.uploadMessage, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "28rem",
      height: "28rem",
      disableClose: true,
      panelClass: 'dialog-custom-style'
    });
  }

  closeModal(){
    this.dialog.closeAll();
  }
}
