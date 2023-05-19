import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ModuleInfoModel,
  ModulePermissionService,
} from 'src/app/core/module-permissions';

@Injectable({
  providedIn: 'root',
})
export class ModulePermissionStore {
  private modulesPermissions$ = new BehaviorSubject<ModuleInfoModel[]>([]);
  public modulesPermissions: Observable<ModuleInfoModel[]> =
    this.modulesPermissions$.asObservable();

  public isLoading$!: Observable<boolean>;
  public notify: string = '';
  public hasError: boolean = false;

  constructor(private modulePermissionService: ModulePermissionService) {}

  public get() {
    this.modulePermissionService.findAll().subscribe((res) => {
      if (!res) return;
      this.modulesPermissions$.next(res);
    });
  }
}
