import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthUserModel } from '../../models';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  form = this.fb.group(
    {
      id: [Math.random() * 1000],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      cPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    }
    /* {
      validator: ConfirmPasswordValidator.MatchPassword,
    } */
  );
  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;

    if (this.authService.currentUserValue) this.router.navigate(['/']);
  }

  ngOnInit(): void {}

  submit() {
    const data = this.form.getRawValue();

    const newUser = new AuthUserModel(data);

    this.hasError = false;
    const subs = this.authService.registration(newUser).subscribe((user) => {
      if (user) this.router.navigate(['/']);
      else this.hasError = true;
    });
    this.unsubscribe.push(subs);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
