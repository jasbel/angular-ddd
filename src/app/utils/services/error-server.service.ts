import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IError, ErrorGeneric, ApiResponseModel, StatusCode } from '..';

@Injectable({ providedIn: 'root' })
export class CommonServerService {
  private _hasError: boolean = false;
  private _notify: string = '';
  constructor() {}

  get hasError() {
    return this._hasError;
  }

  get notify() {
    return this._notify;
  }

  set hasError(error: boolean) {
    this._hasError = error;
  }

  set notify(notify: string) {
    this._notify = notify;
  }

  setNotify(notify: string) {
    this._notify = notify;
  }

  setHasError(error: boolean) {
    this._hasError = error;
  }

  reset() {
    this._hasError = false;
    this._notify = '';
  }

  protected processError<T>(
    err: IError<T>,
    model?: { [key in keyof Partial<T>]: string }
  ) {
    const dataError = err?.error || new ErrorGeneric();
    console.error('Error: ', dataError);
    /* this._notify = getNotifyString(dataError, model); */
    /* this._hasError = true; */

    return of(undefined);
  }

  protected processOK<T>(resp: ApiResponseModel<T>, statusCode: StatusCode) {
    /* this.notify = getNotifyString(resp); */
    return resp.statuscode === statusCode ? true : undefined;
  }

  /* FIXME: probar si se puede quitar, no se si sea necesario enviar mensaje de toast para eliminar */
  protected processErrorDeleted(
    err: IError,
    msg?: 'depedence'
  ): Observable<boolean | undefined> {
    const dataError = err.error || new ErrorGeneric();

    if (
      dataError.statuscode === StatusCode.validationFailed &&
      ((dataError.data as any)['[id]'] || [])[0] === 'ENTITY_ASSIGN_TO_USER'
    ) {
      return of((msg as unknown as any) || true);
    }
    return this.processError(err);
  }
}
