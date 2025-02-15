import { Component } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { NgClass, NgIf } from '@angular/common';
import { DtableComponent } from '../dtable/dtable.component';
import Notiflix from 'notiflix';
import { finalize } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DtableComponent,NgIf,  MatProgressBarModule,
    MatAutocompleteModule,ReactiveFormsModule,  MatSliderModule,
    MatInputModule,MatTabsModule,NgClass],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  columns: string[];
  res_data = [];
  page: any = 'products';
  noDataFound: boolean = false;
  searchForm:FormGroup;
  res_data1: any = [];
  status: string;
  index_value: any = "SEARCH SINGLE USERID";
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
  this.service.get('https://backend.ennomart.com/report/api/users').pipe(finalize(()=>{Notiflix.Loading.remove();})).subscribe(
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
  this.service.put(`https://backend.ennomart.com/report/api/users/${this.searchForm.get('username').value}`,null).pipe(finalize(()=>{Notiflix.Loading.remove();})).subscribe(
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
      return 'user id is required';
    }

    return this.searchForm.controls['username'].hasError('username') ? 'Not a valid user id' : '';
}
onTabChange(event: MatTabChangeEvent) {
    this.selectedTabLabel = event.tab.textLabel;
  
    if (this.selectedTabLabel === 'SEARCH ALL USERID') {
      this.searchsinglealluser();
      this.noDataFound = false;
      this.index_value = this.selectedTabLabel;
      this.reset();
    } else if (this.selectedTabLabel === 'SEARCH SINGLE USERID') {
      this.index_value = this.selectedTabLabel;
      this.res_data = [];
      this.noDataFound = false;
      // You can either call a different API or wait for the user to click search.
    }
  }

}
