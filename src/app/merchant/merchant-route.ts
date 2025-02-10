import { Route } from "@angular/router";

export default [

    {
        path: '',
        loadComponent: () => import('./merchant-main-container/merchant-main-container.component').then((m) => m.MerchantMainContainerComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./merchant-dashboard/merchant-dashboard.component').then((m) => m.MerchantDashboardComponent)
            },
            {
                path: 'reports',
                loadComponent: () => import('./transactionreport/transactionreport.component').then((m) => m.TransactionreportComponent)
            },
            {
                path: 'language',
                loadComponent: () => import('./languageupdate/languageupdate.component').then((m) => m.LanguageupdateComponent)
            },
            {
                path: 'helpdesk',
                loadComponent: () => import('./helpdesk/helpdesk.component').then((m) => m.HelpdeskComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./merchant-profile/merchant-profile.component').then((m) => m.MerchantProfileComponent)
            }

        ]

    },
] satisfies Route[];