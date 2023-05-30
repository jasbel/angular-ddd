import { Routes } from '@angular/router';
import { CustomRoutes, TPath } from '../utils';

const Routing: Routes & CustomRoutes = [
  {
    path: 'users',
    canActivate: [],
    loadChildren: () => import('../modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'dashboard',
    canActivate: [],
    loadChildren: () => import('../modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'collections',
    canActivate: [],
    loadChildren: () => import('../modules/users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', redirectTo: 'users' },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
