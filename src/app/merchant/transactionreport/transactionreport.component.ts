import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-transactionreport',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    DataTableComponent,
  ],
  templateUrl: './transactionreport.component.html',
  styleUrl: './transactionreport.component.scss',
})
export class TransactionreportComponent implements OnInit {
  selectedOption: string = 'date';
  showTable: boolean = false;
  component: any = 'transactiondata';
  columns: any;
  showTable_Tid:boolean =false;

  ngOnInit(): void {
    this.component = 'transactiondata';
  }
  dataForTable = [
    {
      "TransactionID": "#122387654567890945",
      "Amount Transacted": 15,
      "Retailer Username": 'Cubepayuser1',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'cubepayapi',
    },
 
    {
      "TransactionID": "#122387654567898658",
      "Amount Transacted": 9900,
      "Retailer Username": 'Ankitesh007',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'isutest',
    },
 
    {
      "TransactionID": "#785387654567890565",
      "Amount Transacted": 10,
      "Retailer Username": 'payuser',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'payapi',
    },
 
    {
      "TransactionID": "#564387654567890231",
      "Amount Transacted": 150,
      "Retailer Username": 'testuser',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'testUsernew',
    },
 
    {
      "TransactionID": "#345687654567890896",
      "Amount Transacted": 1,
      "Retailer Username": 'paynewapiuser',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'paynewapi',
    },
 
    {
      "TransactionID": "#4654387654567890935",
      "Amount Transacted": 1,
      "Retailer Username": 'isuuser1',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'isutest',
    },
 
  ];
  dataFotTable_Transaction = [
    {
      "TransactionID": "#122387654567890945",
      "Amount Transacted": 15,
      "Retailer Username": 'Cubepayuser1',
      "Gateway": 'bkt.cubepay@finobank',
      "Transaction Type": 'UPI',
      "Username": 'cubepayapi',
    },
  ]
  onSubmit() {
    this.showTable = true;
    this.columns = Object.keys(this.dataForTable[0]);
  }

  reset() {
    this.showTable = false;
  }

  onTransaction_Id_Submit() {
    this.showTable_Tid = true;
    this.columns = Object.keys(this. dataFotTable_Transaction [0]);
  }

  showTable_on_radio() {
    this.showTable = false;
  }

}
