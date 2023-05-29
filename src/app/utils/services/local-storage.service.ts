import { Injectable } from '@angular/core';
import { TRole } from '../interfaces';

export type TKeyStorage =
  | 'userAuth'
  | 'permissions'
  | 'permissionsAll'
  | 'token'
  | 'currentCenter'
  | 'modules'
  | 'userLogin';

@Injectable({ providedIn: 'root' })
export class LocalService {
  // private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor() {}

  /**
   * @property {'permissions'} < IPermissionActions >
   * @property {'permissionsAll'} < IPermissionActions >
   * @property {'token'} < string >
   * @property {'currentCenter'} < CenterInfoAuthModel >
   * @property {'modules'} < TModuleToEs >
   * @property {'userAuth'} < UserAuthModel >
   * @property {'userLogin'} < IUserLogin >
   */
  public setItem<T = unknown>(key: TKeyStorage, data: T): void {
    if (key === 'token') return localStorage.setItem(key, data as unknown as string);

    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * @param userAuth
   * @returns UserAuthModel;
   * @param permissions
   * @returns IPermissionActions;
   * @param token
   * @returns string;
   * @param currentCenter
   * @returns CenterInfoAuthModel;
   */
  public getItem<T = unknown>(key: TKeyStorage): T {
    const value = localStorage.getItem(key);

    if (!value && key === 'userLogin') return {} as T;
    if (!value && key === 'userAuth') return {} as T;
    if (!value && key === 'permissions') return {} as T;
    if (!value && key === 'permissionsAll') return {} as T;
    if (!value && key === 'token') return '' as unknown as T;
    if (!value && key === 'currentCenter') return {} as T;

    if (key === 'token') return value as unknown as T;

    return JSON.parse(value || '') as T;
  }

  public getRole(): TRole {
    const valueString = localStorage.getItem('userAuth')!;
    const value = JSON.parse(valueString || '');

    return value.role;
  }

  public removeItem(key: TKeyStorage): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
