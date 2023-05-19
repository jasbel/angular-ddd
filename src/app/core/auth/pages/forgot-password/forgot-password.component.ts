import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
  NotFound,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({
    email: [
      null,
      [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
        Validators.maxLength(255), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ],
    ],
  });
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    const forgotPasswordSubscr = this.authService
      .forgotPassword(this.f.email.value!)
      .pipe(first())
      .subscribe((result: any) => {
        this.errorState = ErrorStates.HasError;
        if (result) {
          if (result.statuscode === 1000) {
            this.errorState = ErrorStates.NoError;
          }
          if (result.statuscode === -2000) {
            this.errorState = ErrorStates.NotFound;
          }
        }
      });
    this.unsubscribe.push(forgotPasswordSubscr);
  }
}
