import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthStatus } from './core/auth';
import { TRoutePattern } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus());
    if (this.authService.authStatus() === AuthStatus.checking) return false;

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    let _link: TRoutePattern;

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        _link = '/users';
        this.router.navigateByUrl(_link);
        return;

      case AuthStatus.notAuthenticated:
        _link = '/auth/login';
        this.router.navigateByUrl(_link);
        return;
    }
  });
}
