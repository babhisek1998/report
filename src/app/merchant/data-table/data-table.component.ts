import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LanguageupdateComponent } from '../languageupdate/languageupdate.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
export interface UserData {
  id: number;
  name: string;
  progress: number;
  fruit: string;
}

const ELEMENT_DATA: UserData[] = [
  { id: 1, name: 'REF002', progress: 4005, fruit: '2024-10-29' },
  { id: 2, name: 'REF003', progress: 5500, fruit: '2024-10-27' },
  { id: 3, name: 'REF004', progress: 8000, fruit: '2024-10-24' },
  { id: 4, name: 'REF002', progress: 7000, fruit: '2024-10-24' },
];
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() tableData: any[] = [];
  @Input() columnss: any;
  @Input() component: any;
  receiveComponent: any = '';
  originalcols: any;
  displayedColumns: string[];
  modifiedcolumnss: any;
  showAction:boolean = false;
  rowData:any;

 
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private dialog: MatDialog){

  }

  ngOnInit() {
    if (this.columnss != undefined) {
      this.modifydata();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.receiveComponent = this.component;
    console.log(this.receiveComponent,"this.receiveComponent");    
  }
  modifydata() {
    this.receiveComponent = this.component;
    
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log(this.dataSource,"datasource");    
    this.displayedColumns = this.columnss;
    if(this.receiveComponent === 'languageUpdate'){
      this.showAction= true;
      this.displayedColumns = [...this.columnss,'Action'];
    }    
    console.log(this.displayedColumns);
  }

  performAction(e: any) {  
    console.log(e,"e value");
    this.rowData = e;
    
    const dialogRef = this.dialog.open(LanguageModalComponent, {
      data: {
        deviceData: this.rowData
      },
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "25rem",
      disableClose: true,
      panelClass: 'dialog-custom-style',
    })
    


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openChangeDialog(row: any): void {
    alert("alert ");
    
  }
    
}
