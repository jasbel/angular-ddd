import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { ITotalizerInfo } from '../models';
import { TotalizerApiService } from './api/totalizer-api.service';
import { TotalizerES } from '../helpers';
import { IError, StatusCode, getNotifyString, sId } from 'src/app/utils';
import { CommonServerService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class TotalizerService extends CommonServerService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private totalizerApiService: TotalizerApiService) {
    super();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  findAll(queryString?: string): Observable<ITotalizerInfo[] | undefined> {
    this.isLoadingSubject.next(true);

    return this.totalizerApiService.findAll(queryString).pipe(
      map((resp) => (resp ? resp.data : [])),
      catchError((err) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  findOne(id: sId): Observable<ITotalizerInfo | undefined> {
    this.isLoadingSubject.next(true);

    return this.totalizerApiService.findOne(id).pipe(
      map((resp) => {
        this.notify = getNotifyString(resp);
        return resp.data[0];
      }),
      catchError((err: IError<ITotalizerInfo>) => this.processError(err, TotalizerES)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // private create(data: ITotalizerCreate): Observable<true | undefined> {
  //   this.isLoadingSubject.next(true);

  //   return this.totalizerApiService._create(data).pipe(
  //     map((resp) => this.processOK(resp, StatusCode.created)),
  //     catchError((err: IError<ITotalizerCreate>) => this.processError(err, TotalizerES)),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  // private update(data: ITotalizerUpdate, id: sId): Observable<true | undefined> {
  //   this.isLoadingSubject.next(true);

  //   return this.totalizerApiService._update(data, id).pipe(
  //     map((resp) => this.processOK(resp, StatusCode.updated)),
  //     catchError((err: IError<ITotalizerUpdate>) => this.processError(err, TotalizerES)),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  private delete(id: sId): Observable<true | undefined> {
    return this.totalizerApiService._delete(id).pipe(
      map((resp) => this.processOK(resp, StatusCode.deleted)),
      catchError((err: IError) => this.processError(err))
    );
  }

  private activeDeactive(id: sId, active: boolean): Observable<true | undefined> {
    return this.totalizerApiService._actived(id, active).pipe(
      map((res) => this.processOK(res, StatusCode.updated)),
      catchError((err: IError) => this.processError(err))
    );
  }
}
