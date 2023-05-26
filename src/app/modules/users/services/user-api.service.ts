import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { HttpService, ApiResponseModel, EEndpoint, sId } from 'src/app/utils';
import { IUser, IUserCreate, IUserInfo, IUserUpdate } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private endpoint = EEndpoint.user;

  constructor(private httpGeneric: HttpService<IUserInfo, IUserCreate, IUserUpdate>) {}

  findAll(queryString?: string): Observable<ApiResponseModel<IUserInfo>> {
    return this.httpGeneric.findAll(this.endpoint, queryString).pipe(first());
  }

  findOne(id: sId): Observable<ApiResponseModel<IUserInfo>> {
    return this.httpGeneric.findOne(this.endpoint, id).pipe(first());
  }

  create(data: IUserCreate): Observable<ApiResponseModel> {
    return this.httpGeneric.create(this.endpoint, data).pipe(first());
  }

  update(data: IUserUpdate, id: string): Observable<ApiResponseModel> {
    return this.httpGeneric.update(this.endpoint, data, { id }).pipe(first());
  }

  delete(id: sId): Observable<ApiResponseModel> {
    return this.httpGeneric.delete(this.endpoint, id).pipe(first());
  }

  actived(id: string, active: boolean): Observable<ApiResponseModel> {
    return this.httpGeneric.actived(this.endpoint, id, active).pipe(first());
  }
}
