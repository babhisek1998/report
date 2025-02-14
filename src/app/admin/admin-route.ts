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
                path:'users',
                loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent)
            },
            {
                path:'product/view',
                loadComponent: () => import('./view/view.component').then((m) => m.ViewComponent)
            },
            {
                path:'product/add',
                loadComponent: () => import('./add/add.component').then((m) => m.AddComponent)
            },
            {
                path:'product/others',
                loadComponent: () => import('./others/others.component').then((m) => m.OthersComponent)
            },
            {
                path:'leadmanager/row-lead',
                loadComponent: () => import('./row-lead/row-lead.component').then((m) => m.RowLeadComponent)
            },
            {
                path:'leadmanager/proper-lead',
                loadComponent: () => import('./proper-lead/proper-lead.component').then((m) => m.ProperLeadComponent)
            },
            {
                path:'feature',
                loadComponent: () => import('./feature/feature.component').then((m) => m.FeatureComponent)
            }
        
        ]

    },
] satisfies Route[];