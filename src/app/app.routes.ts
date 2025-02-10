import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login-page/login-page.component').then((m) => m.LoginPageComponent)
    },
    {
        path: 'merchant',
        canActivate: [AuthGuard],
        loadChildren: () => import('./merchant/merchant-route')
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin-route')
    }
];
