import { Injectable } from '@angular/core';
import { ModuleCreateModel, ModuleEditModel, ModuleInfoModel } from '../models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import {
  ApiResponseModel,
  getNotifyString,
  IError,
  StatusCode,
} from '../../../utils';
import { HttpModulePermissionService } from './http/http-module-permission.service';
import { ErrorGeneric } from '../../../utils/models';
import { CommonServerService } from 'src/app/utils/services';

export type ModuleType = ModuleInfoModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class ModulePermissionService extends CommonServerService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private httpModulePermissionService: HttpModulePermissionService
  ) {
    super();
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  findAll(queryString?: string): Observable<ModuleInfoModel[] | undefined> {
    this.isLoadingSubject.next(true);
    return this.httpModulePermissionService.findAll(queryString).pipe(
      map((resp) => (resp ? resp.data : [])),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  find(moduleId: string): Observable<ModuleInfoModel | undefined> {
    this.isLoadingSubject.next(true);
    this.hasError = false;

    return this.httpModulePermissionService.find(moduleId).pipe(
      map((resp) => {
        this.notify = getNotifyString(resp);
        return resp.data[0];
      }),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  create(module: ModuleCreateModel): Observable<true | undefined> {
    this.isLoadingSubject.next(true);
    this.hasError = false;

    return this.httpModulePermissionService.create(module).pipe(
      map((resp) => this.processOK(resp, StatusCode.created)),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  update(
    module: ModuleEditModel,
    moduleId: string
  ): Observable<boolean | undefined> {
    this.isLoadingSubject.next(true);
    this.hasError = false;

    return this.httpModulePermissionService.update(module, moduleId).pipe(
      map((resp) => this.processOK(resp, StatusCode.updated)),
      catchError((err: IError) => this.processError(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  delete(moduleId: string | any): Observable<boolean | undefined> {
    this.isLoadingSubject.next(true);
    this.hasError = false;

    return this.httpModulePermissionService.delete(moduleId).pipe(
      map((resp) => this.processOK(resp, StatusCode.deleted)),
      catchError((err: IError) => this.processErrorDeleted(err)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
