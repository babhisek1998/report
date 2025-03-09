import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import Notiflix from 'notiflix';
import { finalize } from 'rxjs';
import { HttpServiceService } from '../../http-service.service';
import { NgIf, NgClass } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { DtableComponent } from '../dtable/dtable.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [DtableComponent,NgIf,  MatProgressBarModule,
      MatAutocompleteModule,ReactiveFormsModule,  MatSliderModule,
      MatInputModule,MatTabsModule,MatCardModule,MatButtonModule,MatToolbarModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
 columns: string[];
  res_data = [];
  page: any = 'users';
  noDataFound: boolean = false;
  searchForm:FormGroup;
  res_data1: any = [];
  status: string;
  index_value: any = "SEARCH SINGLE PRODUCTID";
  selectedTabLabel: string;
  index: number;
constructor(private service:HttpServiceService) {
   this.searchForm = new FormGroup({
     username: new FormControl('',[Validators.required])
   })
  }

ngOnInit(): void {
}
searchsinglealluser(){
  Notiflix.Loading.hourglass({svgColor:'forestgreen'});
  this.service.get('https://backend.ennomart.com/report/api/products').pipe(finalize(()=>{Notiflix.Loading.remove();})).subscribe(
    {
      next:(res:any)=>{
          if (res && res.data.content && res.data.content.length > 0) {
            this.res_data = res.data.content;                
            this.columns = Object.keys(this.res_data[0]);
          } else {
            this.noDataFound = true;
          }
        },
      error:(err:any)=>{
       Notiflix.Notify.failure(err.error.message ? err.error.message : 'Somthing Went Wrong plz Try Again !!');
      }
    }
  )
}
searchsingleuser(){
 Notiflix.Loading.hourglass({svgColor:'forestgreen'});
  this.service.put(`https://backend.ennomart.com/report/api/products/${this.searchForm.get('username').value}`,null).pipe(finalize(()=>{Notiflix.Loading.remove();})).subscribe(
    {
      next:(res:any)=>{
          if (res && res.data.content && res.data.content.length > 0) {
            this.res_data = res.data.content
            this.columns = Object.keys(this.res_data[0]);
          } else {
            this.res_data = [];
            this.noDataFound = true;
          }
        },
      error:(err:any)=>{
       Notiflix.Notify.failure(err.error.message ? err.error.message : 'Somthing Went Wrong plz Try Again !!');
      }
    }
  )
    }
reset(){
    this.searchForm.reset();
    this.res_data = [];
}

getErrorMessage() {
    if (this.searchForm.controls['username'].hasError('required')) {
      return 'Product id is required';
    }

    return this.searchForm.controls['username'].hasError('username') ? 'Not a valid product id' : '';
}
onTabChange(event: MatTabChangeEvent) {
    this.selectedTabLabel = event.tab.textLabel;
  
    if (this.selectedTabLabel === 'SEARCH ALL PRODUCTID') {
      this.searchsinglealluser();
      this.noDataFound = false;
      this.index_value = this.selectedTabLabel;
      this.reset();
    } else if (this.selectedTabLabel === 'SEARCH SINGLE PRODUCTID') {
      this.index_value = this.selectedTabLabel;
      this.res_data = [];
      this.noDataFound = false;
      // You can either call a different API or wait for the user to click search.
    }
  }

}
