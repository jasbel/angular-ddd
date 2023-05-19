import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TPath, sId } from '..';

@Injectable({ providedIn: 'root' })
export class RouterService {
  constructor(private router: Router) {}

  createByPath(path: TPath): void {
    this.router.navigate([`/${path}/create`]);
  }

  editByPath(path: TPath, itemId: sId): void {
    this.router.navigate([`/${path}/${itemId}`]);
  }

  listByPath(path: TPath): void {
    this.router.navigate([`/${path}`]);
  }
}
