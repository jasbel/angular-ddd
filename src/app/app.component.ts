import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, AuthStatus } from './core/auth';
import { TRoutePattern } from './utils';

import { fromEvent, merge, of, timer } from 'rxjs';
import { switchMap, startWith, mapTo, tap } from 'rxjs/operators';
import { INACTIVITY_TIMEOUT } from './core/config';

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

    /* switch (this.authService.authStatus()) {
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
    } */
  });

  sessionActive: boolean = true;

  ngOnInit() {
    const activity$ = merge(fromEvent(document, 'mousemove'), fromEvent(document, 'keydown')).pipe(
      mapTo(true),
      startWith(true)
    );

    activity$
      .pipe(
        switchMap((isActive) => {
          // Si hay actividad, reiniciamos el timer
          if (isActive) {
            return merge(of(true), timer(INACTIVITY_TIMEOUT).pipe(mapTo(false)));
          }
          // Si no hay actividad, simplemente retornamos un observable que emite false
          return of(false);
        }),
        tap((isActive) => (this.sessionActive = isActive as boolean))
      )
      .subscribe((value) => {
        if (!value) this.authService.logout();
      });
  }
}
