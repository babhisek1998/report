import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DtableComponent } from '../dtable/dtable.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Notiflix from 'notiflix';
import { HttpServiceService } from '../../http-service.service';
import { finalize } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-row-lead',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    DtableComponent,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe],
  templateUrl: './row-lead.component.html',
  styleUrl: './row-lead.component.scss'
})
export class RowLeadComponent {
  today = new Date();
  enddate: any = new Date(2023, 1, 1);
  columns: string[];
  res_data = [];
  page: any = 'row_lead';
  noDataFound: boolean = false;
  searchForm: FormGroup;
  res_data1: any = [];
  status: string;

  constructor(private service: HttpServiceService,private datepipe:DatePipe) {
    this.searchForm = new FormGroup({
      leadDate:new FormControl(this.today,Validators.required),
      sellerId:new FormControl('',Validators.required)
    })
  }

  ngOnInit() {
    // this.row_fetch();
  }

  row_fetch() {
    Notiflix.Loading.hourglass({ svgColor: 'forestgreen' });
  
    const requestBody = {
      sellerId: this.searchForm.get('sellerId').value,
      leadDate: this.datepipe.transform(this.searchForm.get('leadDate').value,'yyyy-MM-dd')
    };
  
    this.service.post('https://backend.ennomart.com/buyer/buyer-seller-lead', requestBody)
      .pipe(finalize(() => { Notiflix.Loading.remove(); }))
      .subscribe({
        next: (res: any) => {
          if (res && res.length > 0) {
            this.res_data = res;
            this.columns = Object.keys(this.res_data[0]);
          } else {
            this.noDataFound = true;
          }
        },
        error: (err: any) => {
          Notiflix.Notify.failure(err.error?.message || 'Something Went Wrong, Please Try Again!!');
        }
      });
  }
  
}
