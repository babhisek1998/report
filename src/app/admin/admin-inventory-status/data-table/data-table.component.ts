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
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [   MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit,AfterViewInit {
  @Input() tableData: any[] = [];
  @Input() columnss: any;
  @Input() component: any;
  receiveComponent: any = '';
  originalcols: any;
  displayedColumns: string[];
  modifiedcolumnss: any;

 
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit() {
    console.log(this.columnss);

    
    if (this.columnss != undefined) {
      this.modifydata();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.tableData);
    console.log(this.columnss);
    console.log(this.component);
  }
  modifydata() {
    this.receiveComponent = this.component;
    this.dataSource = new MatTableDataSource(this.tableData);

    this.displayedColumns = this.columnss;
    console.log(this.displayedColumns);
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
