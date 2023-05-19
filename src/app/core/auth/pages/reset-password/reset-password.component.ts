import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  NonNullableFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm = this.fb.group({
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ]),
    ],
  });
  hasError: boolean = false;
  isLoading$: Observable<boolean>;
  code: string;
  returnUrl: string = '';

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  // private routeSub: Subscription;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    this.code = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.code = params['code'];

      if (this.code) this.getIsValidCode();
    });

    this.code = this.route.snapshot.paramMap.get('code') || '';

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  get f() {
    return this.resetForm.controls;
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .resetPassword(this.code, this.f.password.value!)
      .pipe(first())
      .subscribe((dataSubmit: any) => {
        if (dataSubmit) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  getIsValidCode() {
    this.hasError = false;
    this.authService.getValidCode(this.code).subscribe({
      next: (resp) => {
        if (!resp) this.router.navigate([this.returnUrl]);
      },
      error: (err) => {
        this.router.navigate([this.returnUrl]);
        this.hasError = true;
        console.error({ err });
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    // this.routeSub.unsubscribe();
  }
}
