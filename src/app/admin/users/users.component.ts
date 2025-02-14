import { Component } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DtableComponent } from '../dtable/dtable.component';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DtableComponent,NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
     res_data: any[] = [];
     constructor(private service:HttpServiceService){

     }
     ngOnInit(){
      this.fetchUser();
     }

     fetchUser(){
      Notiflix.Loading.hourglass({svgColor:'forestgreen'});
      this.service.get('https://dummyjson.com/users').subscribe({
        next:(res:any)=>{
          if (res) {
            if (res && res.users.length > 0) {
                Notiflix.Loading.remove();
              this.res_data = res.users;           
            } else {
              Notiflix.Loading.remove();
               this.res_data = [];
            }
          }
        },
        error:(err:any)=>{
          Notiflix.Loading.remove();
        }
      })
     }
}
