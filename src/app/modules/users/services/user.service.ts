import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IUserCreate, IUserInfo, IUserUpdate } from '../models';
import { UserApiService } from './user-api.service';
import { UserES } from '../helpers';
import { CommonServerService, IError, StatusCode, getNotifyString, sId } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CommonServerService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private userApiService: UserApiService) {
    super();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  findAll(queryString?: string): Observable<IUserInfo[] | undefined> {
    this.isLoadingSubject.next(true);

    return this.userApiService.findAll(queryString).pipe(
      map((resp) => (resp ? resp.data : [])),
      catchError((err) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  findOne(id: sId): Observable<IUserInfo | undefined> {
    this.isLoadingSubject.next(true);

    return this.userApiService.findOne(id).pipe(
      map((resp) => {
        this.notify = getNotifyString(resp);
        return resp.data[0];
      }),
      catchError((err: IError<IUserInfo>) => this.processError(err, UserES)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  create(data: IUserCreate): Observable<true | undefined> {
    this.isLoadingSubject.next(true);

    return this.userApiService.create(data).pipe(
      map((resp) => this.processOK(resp, StatusCode.created)),
      catchError((err: IError<IUserCreate>) => this.processError(err, UserES)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  update(data: IUserUpdate, dataId: string): Observable<true | undefined> {
    this.isLoadingSubject.next(true);

    return this.userApiService.update(data, dataId).pipe(
      map((resp) => this.processOK(resp, StatusCode.updated)),
      catchError((err: IError<IUserUpdate>) => this.processError(err, UserES)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  delete(id: sId): Observable<true | undefined> {
    return this.userApiService.delete(id).pipe(
      map((resp) => this.processOK(resp, StatusCode.deleted)),
      catchError((err: IError) => this.processError(err))
    );
  }

  activeDeactive(id: string, active: boolean): Observable<true | undefined> {
    return this.userApiService.actived(id, active).pipe(
      map((res) => this.processOK(res, StatusCode.updated)),
      catchError((err: IError) => this.processError(err))
    );
  }
}
