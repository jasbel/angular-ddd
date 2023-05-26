import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CustomRoutes } from 'src/app/utils';

const routes: Routes & CustomRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [],
        loadChildren: () => import('../../modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        canActivate: [],
        loadChildren: () => import('../../modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'collections',
        canActivate: [],
        loadChildren: () => import('../../modules/users/users.module').then((m) => m.UsersModule),
      },
      { path: '**', redirectTo: 'users' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
