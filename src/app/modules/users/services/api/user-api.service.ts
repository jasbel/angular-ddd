import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ApiResponseModel, EEndpoint, sId } from 'src/app/utils';
import { HttpService } from 'src/app/core/services';
import {
  IUserCreate,
  IUserInfo,
  IUserUpdate,
  UserCreateApi,
  UserAdapter,
  UserInfoApi,
  UserUpdateApi,
} from '../../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private endpoint = EEndpoint.user;
  private adapter = new UserAdapter();

  constructor(private httpGeneric: HttpService<UserInfoApi, UserCreateApi, UserUpdateApi>) {}

  findAll(queryString?: string): Observable<ApiResponseModel<IUserInfo>> {
    return this.httpGeneric
      .findAll(this.endpoint, queryString)
      .pipe(map((val) => ({ ...val, data: this.adapter.adaptAll(val.data) })))
      .pipe(first());
  }

  findOne(id: sId): Observable<ApiResponseModel<IUserInfo>> {
    return this.httpGeneric
      .findOne(this.endpoint, id)
      .pipe(map((val) => ({ ...val, data: this.adapter.adaptAll(val.data) })))
      .pipe(first());
  }

  create(data: IUserCreate): Observable<ApiResponseModel> {
    const _data = this.adapter.adaptCreateApi(data);
    return this.httpGeneric.create(this.endpoint, _data).pipe(first());
  }

  update(data: IUserUpdate, id: sId): Observable<ApiResponseModel> {
    const _data = this.adapter.adaptUpdateApi(data);
    return this.httpGeneric.update(this.endpoint, _data, { id }).pipe(first());
  }

  delete(id: sId): Observable<ApiResponseModel> {
    return this.httpGeneric.delete(this.endpoint, id).pipe(first());
  }

  actived(id: sId, active: boolean): Observable<ApiResponseModel> {
    return this.httpGeneric.actived(this.endpoint, id, active).pipe(first());
  }
}
