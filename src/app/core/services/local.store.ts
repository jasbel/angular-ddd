import { Injectable } from '@angular/core';
import { UserUpdateModel } from 'src/app/modules/users';

type TypeMapping = {
  user: Partial<UserUpdateModel>;
  current: string;
};

@Injectable({ providedIn: 'root' })
export class LocalStore {
  constructor() {}

  public setItem<K extends keyof TypeMapping>(key: K, data: TypeMapping[K]): void {
    if (key === 'current') {
      localStorage.setItem(key, data as unknown as string);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public getItem<K extends keyof TypeMapping>(key: K): TypeMapping[K] {
    const value = localStorage.getItem(key);

    if (!value) {
      switch (key) {
        case 'user':
          return {} as TypeMapping[K];
        case 'current':
          return '' as unknown as TypeMapping[K];
      }
    }

    if (key === 'current') {
      return value as unknown as TypeMapping[K];
    }

    return JSON.parse(value || '') as TypeMapping[K];
  }

  public clearItem<K extends keyof TypeMapping>(key: K): void {
    switch (key) {
      case 'user':
        return localStorage.setItem(key, '{}');
      case 'current':
        return localStorage.setItem(key, '');
    }
  }

  public removeItem<K extends keyof TypeMapping>(key: K): void {
    localStorage.removeItem(key);
  }
}
