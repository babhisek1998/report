import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  // dashboardimg: string = '../assets/images/admin/11641630_4782104 1.png';
  // userType: string = JSON.parse(sessionStorage.getItem('dashboardData')).userType;
}
