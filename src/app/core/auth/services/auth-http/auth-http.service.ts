import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { ApiResponseModel } from 'src/app/utils';
import { API_URL } from 'src/app/utils/config';
import { AuthUserInfoModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    let form = new FormData();
    form.append('username', email);
    form.append('password', password);
    return this.http.post<any>(`${API_URL}/login`, form).pipe(first());
  }

  createUser(user: AuthUserInfoModel): Observable<AuthUserInfoModel> {
    return this.http.post<AuthUserInfoModel>(API_URL, user).pipe(first());
  }

  forgotPassword(email: string): Observable<any> {
    let form = new FormData();
    form.append('username', email);
    return this.http
      .post<any>(`${API_URL}/forgot-password`, form)
      .pipe(first());
  }

  getValidCode(code: string): Observable<ApiResponseModel> {
    return this.http
      .get<ApiResponseModel>(`${API_URL}/validate-reset-code-password/${code}`)
      .pipe(first());
  }
  resetPassword(code: string, password: string): Observable<any> {
    let form_pass = new FormData();
    form_pass.append('password', password);
    return this.http
      .post<any>(`${API_URL}/reset-code-password/${code}`, form_pass)
      .pipe(first());
  }
}
