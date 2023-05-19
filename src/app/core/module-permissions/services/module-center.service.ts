import { Injectable } from '@angular/core';
import { HttpModuleCenterService } from './http/http-module-center.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IError, StatusCode } from '../../../utils/interfaces';
import {
  IModuleCenterEdit,
  IModuleCenterInfo,
} from '../models/module-center.interfaces';
import { CommonServerService } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class ModuleCenterService extends CommonServerService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private httpModuleCenterService: HttpModuleCenterService) {
    super();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  find(centerId: string): Observable<IModuleCenterInfo[] | undefined> {
    this.isLoadingSubject.next(true);

    return this.httpModuleCenterService.findAll(centerId).pipe(
      map((resp) => (resp ? resp.data : [])),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  update(
    data: IModuleCenterEdit,
    centerId: string
  ): Observable<true | undefined> {
    this.isLoadingSubject.next(true);
    this.hasError = false;

    return this.httpModuleCenterService.update(data, centerId).pipe(
      map((resp) => this.processOK(resp, StatusCode.updated)),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
