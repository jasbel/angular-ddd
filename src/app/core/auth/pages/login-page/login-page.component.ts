import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { TRoutePattern } from 'src/app/utils';
import { AuthES } from '../../helpers';
import { isDev } from 'src/app/core/config';

const initLogin = {
  name: isDev ? 'admin@29' : null,
  password: isDev ? '12345678' : null,
};

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    name: [initLogin.name, [Validators.required, Validators.email]],
    password: [initLogin.password, [Validators.required, Validators.minLength(8)]],
  });

  authEs = AuthES;

  login() {
    const { name, password } = this.form.getRawValue();

    this.authService.login({ name, password }).subscribe({
      next: () => this.router.navigateByUrl(<TRoutePattern>'/users'),
      error: (err) => {
        Swal.fire('Error', err, 'error');
      },
    });
  }
}
