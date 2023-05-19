import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegistrationPageComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
