import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRoleService, AuthService } from 'src/app/core/auth';
import { TRole } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  constructor(
    private authService: AuthService,
    private router: Router,
    private authRole: AuthRoleService,
    private location: Location
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    _component: unknown,
    _currentRoute: ActivatedRouteSnapshot,
    _currentState: RouterStateSnapshot,
    _nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    _route: Route,
    _segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, _url: string): boolean {
    if (!this.authService.currentUserValue) {
      this.goToMain();
      return false;
    }

    /* Con Roles, si tiene lista de roles ya no pasa a permisos */
    const roles: TRole[] = route.data['roles'];

    if (roles && roles.length) {
      const currentRol = this.authService.currentUserValue.role;

      return !!roles.includes(currentRol);
    }

    /* Con Permissos */
    const [_module, ..._actions] = route.data['permission'];
    //TODO: solo se esta pensando para una accion, si se piensa implementar mas de una preguntar si es condicion or/and ?
    const action = _actions[0] || '';

    const currentActions = this.authRole.getPermissionsByModule(_module);

    if (currentActions.indexOf(action) === -1) {
      this.goToMain();
      return false;
    }
    return true;
  }

  private goToMain(): void {
    const canGoBack = !!this.router.getCurrentNavigation()?.previousNavigation;
    if (canGoBack) this.location.back();
    else this.router.navigate(['/dashboard']);
  }
}
