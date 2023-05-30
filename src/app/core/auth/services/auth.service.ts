import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, map, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { ApiResponseModel } from 'src/app/utils';
import { environment } from 'src/environments/environments';
import { AuthApiService } from './auth-api';
import { IAuthUser, IUserLogin, LoginModel, UserAuthModel } from '../models';
import { AuthStatus } from '../models';
import { LocalService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<IUserLogin | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  get currentUserValue() {
    return this._currentUser();
  }

  constructor(private authHttpService: AuthApiService, private router: Router, private local: LocalService) {
    this.checkAuthStatus().subscribe();

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  private setAuthentication(user: IUserLogin, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    this.local.setItem('token', token);
    this.local.setItem('userLogin', user);

    return true;
  }

  getUserByToken(): Observable<IUserLogin | undefined> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) return of(undefined);

    const user = this.local.getItem<IUserLogin>('userLogin');
    if (!user) return of(undefined);

    this._currentUser.set(user);

    return of(user);
  }

  private getAuthFromLocalStorage(): UserAuthModel | undefined {
    try {
      const authData = this.local.getItem<UserAuthModel>('userAuth');
      if (!authData) return undefined;
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  login(_data: LoginModel): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(_data).pipe(
      map((res) => {
        const { data } = res;
        const { id, name } = data[0];
        return this.setAuthentication({ id, name }, data[0].token);
      }),
      catchError((err) => throwError(() => err.error.message)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    // const url = `${this.baseUrl}/auth/check-token`;
    const token = this.local.getItem<string>('token');
    const user = this.local.getItem<IUserLogin>('userLogin');

    if (!token || !user) {
      this.logout();
      return of(false);
    }

    return of(this.setAuthentication(user, token));

    /*  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => {
        return this.setAuthentication(user, token);
      }),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    ); */
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

    this.local.clearAll();
    this.router.navigate(['/auth/login'], { queryParams: {} });
  }

  registration(data: IAuthUser): Observable<boolean | null> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(data).pipe(
      switchMap(() => this.login({ name: data.name, password: data.password })),
      catchError((err) => of(null)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<ApiResponseModel> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.forgotPassword(email).pipe(
      map((res) => res),
      catchError((err) => of(err.error)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  resetPassword(code: string, password: string): Observable<UserAuthModel | undefined> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.resetPassword(code, password).pipe(
      catchError((err) => of(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  setPassword(code: string, password: string): Observable<ApiResponseModel | undefined> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.resetPassword(code, password).pipe(
      catchError((err) => of(undefined)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getValidCode(code: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService.getValidCode(code).pipe(
      map((resp) => resp),
      catchError((error) => of(false)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}

/*


/*
  private setDataAuthToLocalStorage(auth: UserAuthModel) {
    if (!auth) return;

    this.local.setItem('userAuth', auth);
    this.local.setItem('token', auth.token);
    this.local.setItem('modules', auth.modules);

    const _permissionsArray = separeModuleAndPermission(auth.permissions);
    const _permissions: IPermissionActions =
      joinKeyModuleWithPermissions(_permissionsArray);

    this.local.setItem('permissions', _permissions);

    this.authRole.setInitPermission();
  }

  private getAuthFromLocalStorage(): UserAuthModel | undefined {
    try {
      const authData = this.local.getItem<UserAuthModel>('userAuth');
      if (!authData) return undefined;
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  */
