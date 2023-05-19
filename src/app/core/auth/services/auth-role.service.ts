import { Injectable } from '@angular/core';
import {
  IPermissionActions,
  TRole,
  sModuleName,
  TActionPermission,
} from 'src/app/utils';
import {
  ModulesOfMgrCenter,
  ModulesOfMgrGroup,
  ModulesOfSuperAdmin,
} from '../helpers/auth-role.constant';
import { LocalStorageService } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleService {
  actionPermissions: TActionPermission[] = [];

  constructor(private local: LocalStorageService) {
    this.actionPermissions = [];
  }

  getPermissionLocalStorage(): IPermissionActions {
    return this.local.getItem<IPermissionActions>('permissions') || {};
  }

  getPermissionsByModule(_module: sModuleName): TActionPermission[] {
    const _moduleActionList = this.getPermissionLocalStorage();
    const _permissions = _moduleActionList[_module] || [];

    return _permissions;
  }

  setActionPermissionsByModule(_module: sModuleName) {
    const _moduleActionList = this.getPermissionLocalStorage();
    this.actionPermissions = _moduleActionList[_module] || [];

    if (_module === 'generic') this.actionPermissions = ['all'];
  }

  setInitPermission() {
    if (this.isRole('super_admin')) {
      const _permissions =
        this.local.getItem<IPermissionActions>('permissions');
      this.local.setItem('permissionsAll', _permissions);
      this.setResetPermission();
    }
    if (this.isRole('group_manager')) {
      const _permissions =
        this.local.getItem<IPermissionActions>('permissions');
      this.local.setItem('permissionsAll', _permissions);
      this.setResetPermission();
    }
  }

  setResetPermission() {
    if (this.isRole('super_admin')) this.local.removeItem('currentCenter');
    if (this.isRole('super_admin')) this.setPermissionAdmin();

    if (this.isRole('group_manager')) this.local.removeItem('currentCenter');
    if (this.isRole('group_manager')) this.setPermissionGroup();
  }

  setPermissionByRole(role: Extract<TRole, 'center_manager'>) {
    if (role === 'center_manager' && this.isRole('group_manager'))
      this.setPermissionCenterInfo();
    if (role === 'center_manager' && this.isRole('super_admin'))
      this.setPermissionCenter();
  }

  canCenterLogin() {
    if (
      (this.isRole('super_admin') || this.isRole('group_manager')) &&
      JSON.stringify(this.local.getItem('currentCenter')) === '{}'
    )
      return true;
    return false;
  }

  containRole(roles: TRole[]): boolean {
    const _role = this.local.getRole();
    return roles.includes(_role);
  }

  private isRole(role: TRole): boolean {
    const _role = this.local.getRole();
    return role === _role;
  }

  private setPermissionAdmin(): void {
    const _permissions =
      this.local.getItem<IPermissionActions>('permissionsAll');
    const _cPermissions = {} as IPermissionActions;

    ModulesOfSuperAdmin.forEach((m) => (_cPermissions[m] = _permissions[m]));

    this.local.setItem('permissions', _cPermissions);
  }
  private setPermissionGroup(): void {
    const _permissions =
      this.local.getItem<IPermissionActions>('permissionsAll');
    const _cPermissions = {} as IPermissionActions;

    ModulesOfMgrGroup.forEach((m) => (_cPermissions[m] = _permissions[m]));

    this.local.setItem('permissions', _cPermissions);
  }

  private setPermissionCenter(): void {
    const _permissions =
      this.local.getItem<IPermissionActions>('permissionsAll');
    const _cPermissions = {} as IPermissionActions;

    ModulesOfMgrCenter.forEach(
      (m) => (_cPermissions[m] = _permissions[m] || [])
    );

    this.local.setItem('permissions', _cPermissions);
  }

  private setPermissionCenterInfo(): void {
    const _permissions =
      this.local.getItem<IPermissionActions>('permissionsAll');
    const _cPermissions = {} as IPermissionActions;

    ModulesOfMgrCenter.forEach(
      (m) =>
        (_cPermissions[m] = (_permissions[m] || []).filter((p) => p === 'list'))
    );

    this.local.setItem('permissions', _cPermissions);
  }
}
