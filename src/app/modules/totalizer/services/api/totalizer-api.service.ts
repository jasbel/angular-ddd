import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ApiResponseModel, EEndpoint, sId } from 'src/app/utils';
import { HttpService } from 'src/app/core/services';
import {
  ITotalizerInfo,
  TotalizerAdapter,
  TotalizerInfoApi,
} from '../../models';

@Injectable({ providedIn: 'root' })
export class TotalizerApiService {
  private endpoint = EEndpoint.totalizer;
  private adapter = new TotalizerAdapter();

  constructor(private httpGeneric: HttpService<TotalizerInfoApi>) {}

  findAll(queryString?: string): Observable<ApiResponseModel<ITotalizerInfo>> {
    return this.httpGeneric
      .findAll(this.endpoint, queryString)
      .pipe(map((val) => ({ ...val, data: this.adapter.adaptAll(val.data) })))
      .pipe(first());
  }

  findOne(id: sId): Observable<ApiResponseModel<ITotalizerInfo>> {
    return this.httpGeneric
      .findOne(this.endpoint, id)
      .pipe(map((val) => ({ ...val, data: this.adapter.adaptAll(val.data) })))
      .pipe(first());
  }

 /*  _create(data: ITotalizerCreate): Observable<ApiResponseModel> {
    const _data = this.adapter.adaptCreateApi(data);
    return this.httpGeneric.create(this.endpoint, _data).pipe(first());
  }

  _update(data: ITotalizerUpdate, id: sId): Observable<ApiResponseModel> {
    const _data = this.adapter.adaptUpdateApi(data);
    return this.httpGeneric.update(this.endpoint, _data, { id }).pipe(first());
  } */

  _delete(id: sId): Observable<ApiResponseModel> {
    return this.httpGeneric.delete(this.endpoint, id).pipe(first());
  }

  _actived(id: sId, active: boolean): Observable<ApiResponseModel> {
    return this.httpGeneric.actived(this.endpoint, id, active).pipe(first());
  }
}
