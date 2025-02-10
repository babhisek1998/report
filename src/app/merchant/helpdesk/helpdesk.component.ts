import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-helpdesk',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './helpdesk.component.html',
  styleUrl: './helpdesk.component.scss'
})
export class HelpdeskComponent {

  raiseissueForm:FormGroup

}
