import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
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

@NgModule({
  declarations: [
    UsersComponent,
    UserListPageComponent,
    UserListComponent,
    UserDetailComponent,
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
  exports: [UserListComponent, UserDetailComponent, UserFormComponent],
})
export class UsersModule {}
