import { Component, OnInit, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
  });

  hasError: boolean = false;
  code: string;
  returnUrl!: string;
  isLoading$: Observable<boolean>;

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
    // redirect to home if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
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
    return this.form.controls;
  }

  submit() {
    this.hasError = false;
    const subs = this.authService
      .setPassword(this.code, this.f.password.value!)
      .subscribe((res) => {
        if (!res) return;

        if (res.statuscode !== 1000) {
          this.hasError = true;
        } else {
          this.hasError = false;
          this.router.navigate([this.returnUrl]);
        }
      });
    this.unsubscribe.push(subs);
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
