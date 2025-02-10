import { Route } from "@angular/router";

export default [

    {
        path: '',
        loadComponent: () => import('./admin-main-container/admin-main-container.component').then((m) => m.AdminMainContainerComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
            },
            {
                path: 'usermanagement',
                loadChildren: () => import('./admin-user-management/admin-user-managemenroutes')
            },
            {
                path: 'devicemanagement',
                loadComponent: () => import('./admin-device-management/admin-device-management.component').then((m) => m.AdminDeviceManagementComponent)
            },
            {
                path: 'inventorystat',
                loadComponent: () => import('./admin-inventory-status/admin-inventory-status.component').then((m) => m.AdminInventoryStatusComponent)
            },
            {
                path: 'devicedelivery',
                loadComponent: () => import('./device-delivery-status/device-delivery-status.component').then((m) => m.DeviceDeliveryStatusComponent)
            },
            {
                path: 'reports',
                loadComponent: () => import('./admin-reports/admin-reports.component').then((m) => m.AdminReportsComponent)
            },
            {
                path: 'helpdesk',
                loadComponent: () => import('./admin-helpdesk/admin-helpdesk.component').then((m) => m.AdminHelpdeskComponent)
            },
            {
                path: 'notifications',
                loadComponent: () => import('./admin-notification-center/admin-notification-center.component').then((m) => m.AdminNotificationCenterComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./admin-profile/admin-profile.component').then((m) => m.AdminProfileComponent)
            }
        ]

    },
] satisfies Route[];