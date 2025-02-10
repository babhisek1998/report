import { Route } from "@angular/router";

export default [

    {
        path: '',
        loadComponent: () => import('./admin-user-management.component').then((m) => m.AdminUserManagementComponent),
        children: [
            {
                path: 'createbnkuser',
                loadComponent: () => import('./create-bank-user/create-bank-user.component').then((m) => m.CreateBankUserComponent)
            },
            {
                path: 'createmerchant',
                loadComponent: () => import('./create-merchant/create-merchant.component').then((m) => m.CreateMerchantComponent)
            },
            {
                path: 'showuser',
                loadComponent: () => import('./showuser/showuser.component').then((m) => m.ShowuserComponent)
            },
            {
                path: 'viewuser',
                loadComponent: () => import('./viewuser/viewuser.component').then((m) => m.ViewuserComponent)
            }
        ]

    },
] satisfies Route[];