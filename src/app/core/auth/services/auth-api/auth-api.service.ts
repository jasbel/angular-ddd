import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, first, map } from 'rxjs/operators';

import { ApiResponseModel, EEndpoint } from 'src/app/utils';
import { API_URL } from 'src/app/utils/config';
import { AuthUserModel, LoginModel, LoginResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private endpoint = `${API_URL}${EEndpoint.auth}`;

  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<LoginResponse> {
    // let form = new FormData();
    // form.append('username', email);
    // form.append('password', password);
    // return this.http.post<AuthUserModel>(`${this.endpoint}/login`, form).pipe(first());

    const url = `${this.endpoint}/login`;
    const body = data;

    return this.http.post<LoginResponse>(url, body).pipe(first());
  }

  createUser(user: AuthUserModel): Observable<AuthUserModel> {
    return this.http.post<AuthUserModel>(this.endpoint, user).pipe(first());
  }

  forgotPassword(email: string): Observable<AuthUserModel> {
    let form = new FormData();
    form.append('username', email);
    return this.http.post<AuthUserModel>(`${this.endpoint}/forgot-password`, form).pipe(first());
  }

  getValidCode(code: string): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(`${this.endpoint}/validate-reset-code-password/${code}`).pipe(first());
  }

  resetPassword(code: string, password: string): Observable<ApiResponseModel> {
    let form_pass = new FormData();
    form_pass.append('password', password);
    return this.http.post<ApiResponseModel>(`${this.endpoint}/reset-code-password/${code}`, form_pass).pipe(first());
  }
}
