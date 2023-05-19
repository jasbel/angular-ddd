import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

import {
  ApiResponseEnumModel,
  ApiResponseModel,
  EError400Msg,
  EErrorMsgCore,
  IConfigGetAll,
  IDataGeneric,
  IError,
  TError400Msg,
  clearNullorEmptyorUndefined,
  getHashToObject,
  getNotifyString,
} from '..';
import { AuthGenericService } from './auth-generic.service';
import { PendingService } from './pending.service';
import { ToastService } from './toast/toast.service';
import { ErrorGeneric } from '..';

type TModelES<T> = { [key in keyof T]: string };

const API_URL = `https://localhost:8001`;

const defaultConfig: IConfigGetAll = {
  clearNullable: true,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService<TFind, TCreate = TFind, TEdit = TCreate> {
  constructor(
    private http: HttpClient,
    private authGeneric: AuthGenericService,
    private pendingService: PendingService,
    private toast: ToastService
  ) {}

  findEnumNew<T = object>(
    endpoint: string,
    Enum?: unknown
  ): Observable<ApiResponseEnumModel<T>> {
    return this.pendingService.intercept(
      `findEnum-${API_URL}${endpoint}`,
      this.http
        .get<ApiResponseEnumModel<T>>(
          `${API_URL}${endpoint}`,
          this.authGeneric.headers
        )
        .pipe(
          share(),
          tap(
            (_) => {},
            (err: IError) => this.processErrorTap(err)
          )
        )
    );
  }

  findAll<T = TFind>(
    endpoint: string,
    queryString: string = '',
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<T>> {
    return this.pendingService.intercept(
      `findAll-${API_URL}${endpoint}${queryString}`,
      this.http
        .get<ApiResponseModel<T>>(
          `${API_URL}${endpoint}${queryString}`,
          this.authGeneric.headers
        )
        .pipe(
          share(),
          tap(
            (_) => {},
            (err: IError) => !config?.hiddenError && this.processErrorTap(err)
          )
        )
    );
  }

  find<T = TFind>(
    endpoint: string,
    itemId?: string,
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<T>> {
    let uri = itemId ? `/${itemId}` : ``;
    return this.pendingService.intercept(
      `find-${API_URL}${endpoint}${uri}`,
      this.http
        .get<ApiResponseModel<T>>(
          `${API_URL}${endpoint}${uri}`,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (_) => {},
            (err: IError) => !config?.hiddenError && this.processErrorTap(err)
          )
        )
    );
  }

  download(endpoint: string, filename?: string): Observable<Blob> {
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authGeneric.token
    );

    return this.http
      .get<Blob>(API_URL + endpoint, {
        headers,
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((response) => {
          const binaryData = [response.body] as unknown as BlobPart[];
          let _filename = response.headers
            .get('content-disposition')
            ?.split(';')[1]
            .split('=')[1]
            .replace(/\"/g, '');

          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: response.body?.type })
          );
          downloadLink.setAttribute('target', '_blank');
          downloadLink.setAttribute('download', _filename || filename || '');

          document.body.appendChild(downloadLink);
          downloadLink.click();

          return response.body!;
        })
      );
  }

  downloadByData<T>(
    endpoint: string,
    data: T,
    filename?: string
  ): Observable<Blob> {
    const headers = new HttpHeaders().set(
      'authorization',
      'Bearer ' + this.authGeneric.token
    );

    // return this.http.post<Blob>(API_URL + endpoint, data, { ...this.authGeneric.headers, headers, responseType: 'blob' as unknown as any }).pipe(
    return this.http
      .post<Blob>(API_URL + endpoint, data, {
        ...this.authGeneric.headers,
        headers,
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        tap((response) => {
          const binaryData = [response.body] as unknown as BlobPart[];
          let _filename = response.headers
            .get('content-disposition')
            ?.split(';')[1]
            .split('=')[1]
            .replace(/\"/g, '');
          // const binaryData = [response];

          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: response.body?.type })
          );
          downloadLink.setAttribute('target', '_blank');
          downloadLink.setAttribute('download', _filename || filename || '');

          document.body.appendChild(downloadLink);
          downloadLink.click();
        }),
        map((response) => response.body!)
      );
  }

  post<TReq, TRes>(
    endpoint: string,
    data?: TReq
  ): Observable<ApiResponseModel<TRes>> {
    return this.http
      .post<ApiResponseModel<TRes>>(
        `${API_URL}${endpoint}`,
        data,
        this.authGeneric.headers
      )
      .pipe(
        tap(
          (_) => {},
          (err: IError) => this.processErrorTap(err)
        )
      );
  }

  create<T = TCreate, TResp = void>(
    endpoint: string,
    data: T,
    modelES?: TModelES<Partial<T>>,
    // noPending = false,
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<TResp>> {
    const _data = JSON.stringify(data) === `{}` ? undefined : data;

    const _config = config || defaultConfig;

    if (!!_config?.noPending) {
      return this.http
        .post<ApiResponseModel<TResp>>(
          `${API_URL}${endpoint}`,
          !!_config?.clearNullable ? clearNullorEmptyorUndefined(_data) : _data,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) =>
              !_config?.hiddenToast &&
              this.toast.showByStatusModel(
                resp.statuscode /* this.currentModel */
              ),
            (err: IError) =>
              !_config?.hiddenError && this.processErrorTap(err, modelES)
          )
        );
    }

    return this.pendingService.intercept(
      `create-${API_URL}${endpoint}${_data && getHashToObject(_data)}`,
      this.http
        .post<ApiResponseModel<TResp>>(
          `${API_URL}${endpoint}`,
          !!_config?.clearNullable ? clearNullorEmptyorUndefined(_data) : _data,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) =>
              !_config?.hiddenToast &&
              this.toast.showByStatusModel(
                resp.statuscode /* this.currentModel */
              ),
            (err: IError) =>
              !_config?.hiddenError && this.processErrorTap(err, modelES)
          )
        )
    );
  }

  update<T = TEdit, TR = void>(
    endpoint: string,
    item: T & { id?: string },
    itemId?: string,
    modelES?: TModelES<Partial<T>>,
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<TR>> {
    const { id, ..._item } = item?.id ? item : { ...item, id: itemId };
    const _id = id ? `/${id}` : '';

    const __item = JSON.stringify(_item) === `{}` ? undefined : _item;

    const _config = config || defaultConfig;

    return this.pendingService.intercept(
      `update-${API_URL}${endpoint}${_id}${getHashToObject(item || {})}`,
      this.http
        .put<ApiResponseModel>(
          `${API_URL}${endpoint}${_id}`,
          !!_config?.clearNullable
            ? clearNullorEmptyorUndefined(__item)
            : __item,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) =>
              !_config?.hiddenToast &&
              this.toast.showByStatusModel(
                resp.statuscode /* this.currentModel */
              ),
            (err: IError) =>
              !_config?.hiddenError && this.processErrorTap(err, modelES)
          )
        )
    );
  }

  deactive(endpoint: string, itemId: string): Observable<ApiResponseModel> {
    return this.pendingService.intercept(
      `desactive-${API_URL}${endpoint}/active/${itemId}`,
      this.http
        .put<ApiResponseModel>(
          `${API_URL}${endpoint}/active/${itemId}`,
          { active: false } as Partial<IDataGeneric>,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) =>
              this.toast.showByStatusModel(
                resp.statuscode /* this.currentModel */
              ),
            (err: IError) => this.processErrorTap(err)
          )
        )
    );
  }

  activeDeactive(
    endpoint: string,
    itemId: string,
    status: boolean
  ): Observable<ApiResponseModel> {
    return this.http
      .put<ApiResponseModel>(
        `${API_URL}${endpoint}/active/${itemId}`,
        { active: status } as Partial<IDataGeneric>,
        this.authGeneric.headers
      )
      .pipe(
        tap(
          (resp) =>
            this.toast.showByStatusModel(
              resp.statuscode /* this.currentModel */
            ),
          (err: IError) => this.processErrorTap(err)
        )
      );
  }

  restore(endpoint: string, itemId: string): Observable<ApiResponseModel> {
    return this.pendingService.intercept(
      `restore-${API_URL}${endpoint}/active/${itemId}`,
      this.http
        .put<ApiResponseModel>(
          `${API_URL}${endpoint}/active/${itemId}`,
          { active: true } as Partial<IDataGeneric>,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) =>
              this.toast.showByStatusModel(
                resp.statuscode /* this.currentModel */
              ),
            (err: IError) => this.processErrorTap(err)
          )
        )
    );
  }

  delete(endpoint: string, itemId: string): Observable<ApiResponseModel> {
    return this.pendingService.intercept(
      `${API_URL}${endpoint}/${itemId}`,
      this.http
        .delete<ApiResponseModel>(
          `${API_URL}${endpoint}/${itemId}`,
          this.authGeneric.headers
        )
        .pipe(
          tap(
            (resp) => this.toast.showByStatusModel(resp.statuscode),
            (err: IError) => this.processErrorTap(err)
          )
        )
    );
  }

  private processErrorTap<T = void, MT = TFind | TCreate | TEdit | undefined>(
    err: IError<T>,
    modelES?: TModelES<MT>
  ) {
    if (err.status === 401) return this.processError401();

    if (err.status === 400)
      this.processError400(err.error.message as TError400Msg[]);

    this.processErrorValidation(err, modelES);
  }

  private processErrorValidation<T, MT>(
    err: IError<T>,
    modelES?: TModelES<MT>
  ) {
    if (
      !(
        err.status === 400 &&
        err.error.message.includes(EErrorMsgCore.validError)
      )
    )
      return;

    const dataError = err.error || new ErrorGeneric();
    // if (Array.isArray(dataError.data) && dataError.data?.length) return;

    const notify = getNotifyString(dataError, modelES as TModelES<MT>);
    notify && this.toast.showDangerServer(notify);
  }

  private processError400(msgs: TError400Msg[]) {
    (msgs || []).forEach(
      (m) =>
        EError400Msg[m] &&
        this.toast.showDanger(EError400Msg[m] /* || EError400Msg['default'] */)
    );
  }

  private processError401() {
    /* // TODO: actualmente lo redirecciona al principio si no esta autorizado, lo eh comentado */
    this.toast.showDanger('No Autorizado');
    // this.auth.logout();
    // document.location.reload();
  }
}
