import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { LayoutStatus } from '../interfaces';

// PublicGuard - PrivateGuard

export const isNotLayoutenticatedGuard: CanActivateFn = (route, state) => {

  const layoutService = inject( LayoutService );
  const router      = inject( Router );

  if ( layoutService.layoutStatus() === LayoutStatus.layoutenticated ) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
