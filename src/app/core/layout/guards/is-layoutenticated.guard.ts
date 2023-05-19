import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { LayoutStatus } from '../interfaces';

export const isLayoutenticatedGuard: CanActivateFn = (route, state) => {

  const layoutService = inject( LayoutService );
  const router      = inject( Router );

  if ( layoutService.layoutStatus() === LayoutStatus.layoutenticated ) {
    return true;
  }

  // if ( layoutService.layoutStatus() === LayoutStatus.checking ) {
  //   return false;
  // }

  // const url = state.url;
  // localStorage.setItem('url', url);
  router.navigateByUrl('/layout/login');
  return false;
};
