import { Component } from '@angular/core';

@Component({
  templateUrl: './auth.component.html',
  styles: [
    `
      .auth__card-content {
        @apply flex flex-wrap items-center justify-center w-full min-h-screen p-5 bg-center bg-no-repeat bg-cover;

        background: linear-gradient(
          90deg,
          rgba(91, 192, 234, 1) 0%,
          rgb(83, 0, 217) 92%
        );
      }
      .auth__card {
        @apply rounded-3xl w-full;

        max-width: 470px;
      }

      :host ::ng-deep {
        .mat-mdc-card-content {
          padding: 24px;

          &:first-child {
            padding-bottom: 24px;
          }
          &:last-child {
            padding-top: 24px;
          }
        }
      }
    `,
  ],
})
export class AuthComponent {}
