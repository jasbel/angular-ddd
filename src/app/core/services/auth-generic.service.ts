import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLocalService } from './local-storage.service';
import { UserAuthModel } from 'src/app/core/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthSingleGenericService {
  constructor(private local: AuthLocalService) {}

  get headers() {
    let httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return { headers: httpHeaders };
  }

  get token(): string {
    return this.local.getItem('token');
  }

  get userId(): string {
    const user: UserAuthModel = this.local.getItem('userAuth');
    const userId = user.id || '';
    return userId;
  }

  get user(): UserAuthModel {
    return this.local.getItem('userAuth');
  }
}
