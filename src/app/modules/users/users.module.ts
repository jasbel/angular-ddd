import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserUpdatePageComponent } from './pages/user-update-page/user-update-page.component';
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserListPageComponent,
    UserUpdatePageComponent,
    UserCreatePageComponent,

    UserFormComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    SharedModule,
    UsersRoutingModule,
  ],
  providers: [UserService],
  exports: [],
})
export class UsersModule {}
