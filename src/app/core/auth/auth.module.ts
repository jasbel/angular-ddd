import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,

    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
