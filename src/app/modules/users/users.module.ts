import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './domain/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserListPageComponent,
    UserListComponent,
    UserDetailComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule, // Agrega el módulo RouterModule si necesitas utilizar rutas dentro del módulo
  ],
  providers: [UserService],
  exports: [UserListComponent, UserDetailComponent, UserFormComponent],
})
export class UsersModule {}
