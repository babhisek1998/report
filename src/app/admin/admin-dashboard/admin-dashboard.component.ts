import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [  MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgxChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  // Summary Cards Data
  summaryCards = [
    { title: 'Total Sales', value: '$1k', change: '+8% from yesterday' },
    { title: 'Total Orders', value: '300', change: '+5% from yesterday' },
    { title: 'Product Sold', value: '5', change: '+1.2% from yesterday' },
    { title: 'New Customers', value: '8', change: '0.5% from yesterday' }
  ];

  // Chart Color Scheme
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

  // Total Revenue Data
  totalRevenueData = [
    { name: 'Monday', value: 20000 },
    { name: 'Tuesday', value: 15000 },
    { name: 'Wednesday', value: 25000 },
    { name: 'Thursday', value: 10000 },
    { name: 'Friday', value: 18000 },
    { name: 'Saturday', value: 12000 },
    { name: 'Sunday', value: 17000 }
  ];

  // Customer Satisfaction Data
  customerSatisfactionData = [
    { name: 'Last Month', series: [
      { name: 'Week 1', value: 3004 },
      { name: 'Week 2', value: 3200 },
      { name: 'Week 3', value: 2900 },
      { name: 'Week 4', value: 3100 }
    ]},
    { name: 'This Month', series: [
      { name: 'Week 1', value: 4504 },
      { name: 'Week 2', value: 4600 },
      { name: 'Week 3', value: 4300 },
      { name: 'Week 4', value: 4700 }
    ]}
  ];
}
