import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';
import { UserUpdatePageComponent } from './pages/user-update-page/user-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListPageComponent,
      },
      {
        path: 'list',
        component: UserListPageComponent,
      },
      {
        path: 'create',
        component: UserCreatePageComponent,
      },
      {
        path: ':id',
        component: UserUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
