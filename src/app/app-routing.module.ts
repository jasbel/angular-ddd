import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './core/auth';
// import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './core/auth';
// import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';

const routes: Routes = [
  /* {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./core/auth/auth.module').then((m) => m.AuthModule),
  }, */

  {
    path: '',
    canActivate: [/* isAuthenticatedGuard */],
    loadChildren: () => import('./core/layout/layout.module').then((m) => m.LayoutModule),
  },

  /* {
    path: '**',
    redirectTo: 'auth',
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
