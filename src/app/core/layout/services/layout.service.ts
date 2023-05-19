import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { LayoutStatus, CheckTokenResponse, LoginResponse, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<IUser|null>(null);
  private _layoutStatus = signal<LayoutStatus>( LayoutStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public layoutStatus = computed( () => this._layoutStatus() );


  constructor() {
    this.checkLayoutStatus().subscribe();
  }

  private setLayoutentication(user: IUser, token:string): boolean {

    this._currentUser.set( user );
    this._layoutStatus.set( LayoutStatus.layoutenticated );
    localStorage.setItem('token', token);

    return true;
  }




  login( email: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/layout/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setLayoutentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  checkLayoutStatus():Observable<boolean> {

    const url   = `${ this.baseUrl }/layout/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Layoutorization', `Bearer ${ token }`);


      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setLayoutentication( user, token )),
          catchError(() => {
            this._layoutStatus.set( LayoutStatus.notLayoutenticated );
            return of(false);
          })
        );


  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._layoutStatus.set( LayoutStatus.notLayoutenticated );

  }


}
