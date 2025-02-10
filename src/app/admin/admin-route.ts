import { Route } from "@angular/router";

export default [

    {
        path: '',
        loadComponent: () => import('./admin-main-container/admin-main-container.component').then((m) => m.AdminMainContainerComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
            }
        ]

    },
] satisfies Route[];