import { Component } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [SpinnerComponent,RouterOutlet],
  templateUrl: './admin-user-management.component.html',
  styleUrl: './admin-user-management.component.scss'
})
export class AdminUserManagementComponent {

}
