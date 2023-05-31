import { Injectable } from '@angular/core';
import { IPermissionActions, TModuleToEs, TRole } from 'src/app/utils';
import { IUserLogin, LoginResponse, TModule, UserAuthModel } from '../auth';
import { joinKeyModuleWithPermissions, separeModuleAndPermission } from '../auth/helpers/permission.helpers';

type TypeMapping = {
  role: TRole;
  token: string;
  permissions: IPermissionActions;
  permissionsAll: IPermissionActions;
  modules: TModule[];
  userAuth: UserAuthModel;
  userLogin: IUserLogin;
};

@Injectable({ providedIn: 'root' })
export class AuthLocalService {
  constructor() {}

  public setAuthLogin(data: LoginResponse): void {
    const _permissionsArray = separeModuleAndPermission(data.permissions);
    const _permissions: IPermissionActions = joinKeyModuleWithPermissions(_permissionsArray);
    const _modules: TModule[] = Object.keys(data.modules) as TModule[];

    this.setItem('userLogin', { id: data.id, name: data.name });
    this.setItem('modules', _modules);
    this.setItem('permissions', _permissions);
    this.setItem('role', data.role);
    this.setItem('token', data.token);
  }

  public setItem<K extends keyof TypeMapping>(key: K, data: TypeMapping[K]): void {
    if (key === 'token') return localStorage.setItem(key, data as string);

    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem<K extends keyof TypeMapping>(key: K): TypeMapping[K] {
    const value = localStorage.getItem(key);

    if (!value) {
      switch (key) {
        case 'userLogin':
        case 'userAuth':
        case 'permissions':
        case 'permissionsAll':
          return {} as TypeMapping[K];
        case 'token':
          return '' as unknown as TypeMapping[K];
      }
    }

    if (key === 'token') return value as unknown as TypeMapping[K];

    return JSON.parse(value || '') as TypeMapping[K];
  }

  public getRole(): TRole {
    const valueString = localStorage.getItem('userAuth')!;
    const value = JSON.parse(valueString || '');

    return value.role;
  }

  public removeItem<K extends keyof TypeMapping>(key: K): void {
    localStorage.removeItem(key);
  }

  public clearAll() {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('permissions');
    localStorage.removeItem('permissionsAll');
    localStorage.removeItem('token');
    localStorage.removeItem('currentCenter');
  }
}
