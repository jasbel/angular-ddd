import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, ApiResponseModel } from 'src/app/utils';
import { first } from 'rxjs/operators';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private endpoint = `/users`;

  constructor(private httpGeneric: HttpService<User>) {}

  findAll(queryString?: string): Observable<ApiResponseModel<User>> {
    return this.httpGeneric.findAll(this.endpoint, queryString).pipe(first());
  }

  findOne(id: string): Observable<ApiResponseModel<User>> {
    return this.httpGeneric.findOne(this.endpoint, id).pipe(first());
  }

  create(data: User): Observable<ApiResponseModel> {
    return this.httpGeneric.create(this.endpoint, data).pipe(first());
  }

  update(data: User, id: string): Observable<ApiResponseModel> {
    return this.httpGeneric.update(this.endpoint, data, { id }).pipe(first());
  }

  delete(id: string): Observable<ApiResponseModel> {
    return this.httpGeneric.delete(this.endpoint, id).pipe(first());
  }

  activeDeactive(id: string, active: boolean): Observable<ApiResponseModel> {
    return this.httpGeneric.activeDeactive(this.endpoint, id, active).pipe(first());
  }

  /*   findAllByRole(rolecode: TRole): Observable<ApiResponseModel<User>> {
    return this.httpGeneric.findAll(`${this.endpoint}/role/${rolecode}`).pipe(first());
  }
  administrators(): Observable<ApiResponseModel<User>> {
    return this.httpGeneric.findAll('/users/administrators').pipe(first());
  } */
}
