import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpServiceService } from '../../../http-service.service';
import { environment } from '../../../../environments/environment.development';
import { finalize } from 'rxjs';
import { hideLoader, showLoader, ToastUtility } from '../../../common-utility';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-viewuser-dtable',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatPaginatorModule,
    ReactiveFormsModule],
  templateUrl: './viewuser-dtable.component.html',
  styleUrl: './viewuser-dtable.component.scss'
})
export class ViewuserDtableComponent implements OnChanges{

  @Input() tableData: any[] = [];
  @Input() columnss: any;
  rejectForm: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('confirmMessage', { static: true })
  public confirmMessage: TemplateRef<any>;


  receiveComponent: any = '';
  originalcols: any;
  displayedColumns: string[];
  modifiedcolumnss: any;
  showReject: boolean = false;
  merchant: any;
  private toastUtility = new ToastUtility();
  userType: string = JSON.parse(sessionStorage.getItem('dashboardData')).userType;
  userName: string = JSON.parse(sessionStorage.getItem('dashboardData')).userName;

  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog, private httpService: HttpServiceService) {
    this.rejectForm = new FormGroup({
      remarks: new FormControl('', Validators.required)
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.columnss != undefined) {
      this.modifydata();
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.tableData);
    console.log(this.columnss);
  }

  ngOnInit() {
    // if (this.columnss != undefined) {
    //   this.modifydata();
    // }
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log(this.tableData);
    // console.log(this.columnss);
  }

  modifydata() {
    console.log(this.tableData);
    
    // this.dataSource = new MatTableDataSource(this.tableData);
    this.tableData = [...this.tableData];
    this.dataSource = new MatTableDataSource(this.tableData);
    if ((this.userType == 'ROLE_BOB_CHECKER' || this.userType == 'ROLE_ADMIN')) {
      this.displayedColumns = [...this.columnss, 'Action'];
    }
    else {
      this.displayedColumns = [...this.columnss];
    }
    // this.displayedColumns = this.displayedColumns.map(field => field.toUpperCase());
    console.log(this.displayedColumns, "displayed columns");

  }

  closeModal() {
    this.dialog.closeAll();
  }

  updateUser(e: any) {
    showLoader();
    console.log(e);
    let reqBody;
    if (e === 'APPROVED') {
      reqBody = {
        "merchantName": this.merchant,
        "status": e,
        "remarks": 'APPROVED',
        "token": sessionStorage.getItem('CORE_SESSION')
      }
    } else if (e === 'REJECTED') {
      console.log(e);
      let remarks = this.rejectForm.get('remarks')?.value;
      console.log(remarks, "remarks");

      reqBody = {
        "merchantName": this.merchant,
        "status": e,
        "remarks": remarks,
        "token": sessionStorage.getItem('CORE_SESSION')

      }
    }
    this.httpService.post(environment.update_list, reqBody).pipe(finalize(() => { hideLoader(); })).subscribe({
      next: (res: any) => {
        hideLoader();
        console.log(res);
        let successmsg = res.statusDesc;
        this.toastUtility.show(successmsg, 'bg-success', 2000);
        this.closeModal();
      },
      error: (err: any) => {
        hideLoader();
        console.log(err.error.statusDesc, "error");
        let errMsg = err.error.statusDesc;
        this.toastUtility.show(errMsg, 'bg-danger', 2000);
        this.closeModal();
      }
    })
  }

  openEditModal(e: any, data: any) {
    console.log(data, "data");
    this.merchant = data['Merchant Id'];
    if (e === 'reject') {
      this.showReject = true;
    }
    else {
      this.showReject = false;
    }
    this.dialog.open(this.confirmMessage, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "30rem",
      disableClose: true,
      panelClass: 'dialog-custom-style'
    });
  }
  approveClicked() {
    this.showReject = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadJsonArrayToCsv(filename) {
    if (!this.tableData.length) {
      this.toastUtility.show("No Data !!!", 'bg-danger', 2000);
      return;
    }

    // Extract headers from the keys of the first object
    const headers = Object.keys(this.tableData[0]);

    // Map each object in the array to a CSV row
    const csvRows = this.tableData.map(obj =>
      headers.map(header => {
        const value = obj[header];
        // Escape quotes and commas, wrap in double quotes
        return `"${value !== null && value !== undefined ? String(value).replace(/"/g, '""') : ''}"`;
      }).join(',')
    );

    // Combine headers and rows into a single CSV string
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element for download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);

    // Append link to the document and trigger download
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }



}
