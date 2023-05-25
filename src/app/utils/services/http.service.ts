import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

import {
  API_URL,
  ApiResponseEnumModel,
  ApiResponseModel,
  EError400Msg,
  EErrorMsgCore,
  IConfigGetAll,
  IDataGeneric,
  IError,
  TError400Msg,
  clearNullorEmptyorUndefined,
  getNotifyString,
} from '..';
import { AuthGenericService } from './auth-generic.service';
import { ToastService } from './toast/toast.service';
import { ErrorGeneric } from '..';

type TModelES<T> = { [key in keyof T]: string };

const defaultConfig: IConfigGetAll = {
  id: '',
  clear: true,
  hiddenError: false,
  hiddenToast: false,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService<TFind, TCreate = TFind, TEdit = TCreate> {
  constructor(private http: HttpClient, private authGeneric: AuthGenericService, private toast: ToastService) {}

  findAll<T = TFind>(
    endpoint: string,
    queryString: string = '',
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<T>> {
    return this.http.get<ApiResponseModel<T>>(`${API_URL}${endpoint}${queryString}`, this.authGeneric.headers).pipe(
      share(),
      tap({
        next: (_) => {},
        error: (err: IError) => !config?.hiddenError && this.processErrorTap(err),
      })
    );
  }

  findOne<T = TFind>(endpoint: string, itemId?: string, config?: IConfigGetAll): Observable<ApiResponseModel<T>> {
    let uri = itemId ? `/${itemId}` : ``;
    return this.http.get<ApiResponseModel<T>>(`${API_URL}${endpoint}${uri}`, this.authGeneric.headers).pipe(
      tap({
        next: (_) => {},
        error: (err: IError) => !config?.hiddenError && this.processErrorTap(err),
      })
    );
  }

  create<T = TCreate, TResp = void>(
    endpoint: string,
    data: T,
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<TResp>> {
    const _config = { ...defaultConfig, ...config };

    const _data =
      JSON.stringify(data) === `{}` ? undefined : !!_config?.clear ? clearNullorEmptyorUndefined(data) : data;

    return this.http.post<ApiResponseModel<TResp>>(`${API_URL}${endpoint}`, _data, this.authGeneric.headers).pipe(
      tap({
        next: (resp) => !_config?.hiddenToast && this.toast.showByStatusModel(resp.statuscode /* this.currentModel */),
        error: (err: IError) => !_config?.hiddenError && this.processErrorTap(err),
      })
    );
  }

  update<T = TEdit, TR = void>(
    endpoint: string,
    data: T & { id?: string },
    config?: IConfigGetAll
  ): Observable<ApiResponseModel<TR>> {
    const _id = data?.id || config?.id || '';

    const _config = { ...defaultConfig, ...config };

    const _data =
      JSON.stringify(data) === `{}` ? undefined : !!_config?.clear ? clearNullorEmptyorUndefined(data) : data;

    return this.http.put<ApiResponseModel<TR>>(`${API_URL}${endpoint}${_id}`, _data, this.authGeneric.headers).pipe(
      tap({
        next: (resp) => !_config?.hiddenToast && this.toast.showByStatusModel(resp.statuscode),
        error: (err: IError) => !_config?.hiddenError && this.processErrorTap(err),
      })
    );
  }

  delete(endpoint: string, id: string): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(`${API_URL}${endpoint}/${id}`, this.authGeneric.headers).pipe(
      tap({
        next: (resp) => this.toast.showByStatusModel(resp.statuscode),
        error: (err: IError) => this.processErrorTap(err),
      })
    );
  }

  findEnumNew<T = object>(endpoint: string): Observable<ApiResponseEnumModel<T>> {
    return this.http.get<ApiResponseEnumModel<T>>(`${API_URL}${endpoint}`, this.authGeneric.headers).pipe(
      share(),
      tap({
        next: (_) => {},
        error: (err: IError) => this.processErrorTap(err),
      })
    );
  }

  download(endpoint: string, filename?: string): Observable<Blob> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authGeneric.token);

    return this.http
      .get<Blob>(API_URL + endpoint, {
        headers,
        observe: 'response',
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((response) => {
          const binaryData = [response.body] as unknown as BlobPart[];
          let _filename = response.headers.get('content-disposition')?.split(';')[1].split('=')[1].replace(/\"/g, '');

          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: response.body?.type }));
          downloadLink.setAttribute('target', '_blank');
          downloadLink.setAttribute('download', _filename || filename || '');

          document.body.appendChild(downloadLink);
          downloadLink.click();

          return response.body!;
        })
      );
  }

  downloadByData<T>(endpoint: string, data: T, filename?: string): Observable<Blob> {
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authGeneric.token);

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
          let _filename = response.headers.get('content-disposition')?.split(';')[1].split('=')[1].replace(/\"/g, '');
          // const binaryData = [response];

          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: response.body?.type }));
          downloadLink.setAttribute('target', '_blank');
          downloadLink.setAttribute('download', _filename || filename || '');

          document.body.appendChild(downloadLink);
          downloadLink.click();
        }),
        map((response) => response.body!)
      );
  }

  deactive(endpoint: string, id: string): Observable<ApiResponseModel> {
    return this.http
      .put<ApiResponseModel>(
        `${API_URL}${endpoint}/active/${id}`,
        { active: false } as Partial<IDataGeneric>,
        this.authGeneric.headers
      )
      .pipe(
        tap({
          next: (resp) => this.toast.showByStatusModel(resp.statuscode /* this.currentModel */),
          error: (err: IError) => this.processErrorTap(err),
        })
      );
  }

  activeDeactive(endpoint: string, itemId: string, status: boolean): Observable<ApiResponseModel> {
    return this.http
      .put<ApiResponseModel>(
        `${API_URL}${endpoint}/active/${itemId}`,
        { active: status } as Partial<IDataGeneric>,
        this.authGeneric.headers
      )
      .pipe(
        tap({
          next: (resp) => this.toast.showByStatusModel(resp.statuscode /* this.currentModel */),
          error: (err: IError) => this.processErrorTap(err),
        })
      );
  }

  restore(endpoint: string, itemId: string): Observable<ApiResponseModel> {
    return this.http
      .put<ApiResponseModel>(
        `${API_URL}${endpoint}/active/${itemId}`,
        { active: true } as Partial<IDataGeneric>,
        this.authGeneric.headers
      )
      .pipe(
        tap({
          next: (resp) => this.toast.showByStatusModel(resp.statuscode /* this.currentModel */),
          error: (err: IError) => this.processErrorTap(err),
        })
      );
  }

  private processErrorTap<T = void, MT = TFind | TCreate | TEdit | undefined>(err: IError<T>, modelES?: TModelES<MT>) {
    if (err.status === 401) return this.processError401();

    if (err.status === 400) {
      this.processError400(err.error.message as TError400Msg[]);
    }

    this.processErrorValidation(err, modelES);
  }

  private processErrorValidation<T, MT>(err: IError<T>, modelES?: TModelES<MT>) {
    if (!(err.status === 400 && err.error.message.includes(EErrorMsgCore.validError))) return;

    const dataError = err.error || new ErrorGeneric();
    // if (Array.isArray(dataError.data) && dataError.data?.length) return;

    const notify = getNotifyString(dataError, modelES as TModelES<MT>);
    notify && this.toast.showDangerServer(notify);
  }

  private processError400(msgs: TError400Msg[]) {
    (msgs || []).forEach(
      (m) => EError400Msg[m] && this.toast.showDanger(EError400Msg[m] /* || EError400Msg['default'] */)
    );
  }

  private processError401() {
    /* // TODO: actualmente lo redirecciona al principio si no esta autorizado, lo eh comentado */
    this.toast.showDanger('No Autorizado');
    // this.auth.logout();
    // document.location.reload();
  }
}
