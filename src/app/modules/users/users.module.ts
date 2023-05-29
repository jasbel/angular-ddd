import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { UsersComponent } from './users.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserUpdatePageComponent } from './pages/user-update-page/user-update-page.component';
import { UserCreatePageComponent } from './pages/user-create-page/user-create-page.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserListPageComponent,
    UserCreatePageComponent,
    UserUpdatePageComponent,

    UserFormComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    SharedModule,
    UsersRoutingModule,
  ],
  providers: [UserService],
  exports: [],
})
export class UsersModule {}
