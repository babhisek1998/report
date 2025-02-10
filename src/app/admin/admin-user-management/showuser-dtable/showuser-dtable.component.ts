import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ShowuserComponent } from '../showuser/showuser.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-showuser-dtable',
  standalone: true,
  imports: [ShowuserComponent, MatPaginatorModule, MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule],
  templateUrl: './showuser-dtable.component.html',
  styleUrl: './showuser-dtable.component.scss'
})
export class ShowuserDtableComponent {

  @Input() tableData: any[] = [];
  @Input() columnss: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmMessage', { static: true })
  public confirmMessage: TemplateRef<any>;
  userType: string = JSON.parse(sessionStorage.getItem('dashboardData')).userType;

  displayedColumns: string[];
  dataSource: any;

  constructor(private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if ((this.userType == 'ROLE_BOB_MAKER' || this.userType == 'ROLE_ADMIN')) {
      this.displayedColumns = [...this.columnss, 'Action'];
    }
    else {
      this.displayedColumns = this.columnss;
    }    this.showTableData();
  }

  showTableData() {
    console.log(this.displayedColumns, "displayedColumns");
    console.log(this.dataSource, "dataSource");

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditModal() {    
    this.dialog.open(this.confirmMessage, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "30rem",
      disableClose: true,
      panelClass: 'dialog-custom-style'
    });
  }


  closeModal(){
    this.dialog.closeAll();
  }

}
