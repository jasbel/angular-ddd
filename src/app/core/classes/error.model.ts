import { IError, IHeaders, ApiResponseModel, StatusCode } from '../../utils/interfaces';

export class ErrorGeneric<T = void> implements IError<T> {
  headers: IHeaders;
  status: /* number | */ 0 | 200 | 401 | 400;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: ApiResponseModel<T>;

  constructor() {
    this.headers = {
      lazyUpdate: null,
      normalizedNames: '',
    };
    this.status = 0;
    this.statusText = '';
    this.url = '';
    this.ok = false;
    this.name = '';
    this.message = '';
    this.error = {
      count: 0,
      data: [],
      message: [],
      statuscode: StatusCode.errRequest,
      timestamp: '',
    };
  }
}
