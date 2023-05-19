import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../../utils';
import { IModuleCenterInfo, IModuleCenterCreate, IModuleCenterEdit } from '../../models/module-center.interfaces';
import { HttpService } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class HttpModuleCenterService {
  // private endpoint = '/assign-modules';
  private endpoint = '/center/modules';
  constructor(private httpService: HttpService<IModuleCenterInfo, IModuleCenterCreate, IModuleCenterEdit>) {}

  findAll(centerId: string): Observable<ApiResponseModel<IModuleCenterInfo>> {
    return this.httpService.findAll(`${this.endpoint}/${centerId}`);
  }

  // find(centerId: string): Observable<ApiResponseModel<IModuleCenterInfo>> {
  //   return this.httpService.find(this.endpoint, centerId).pipe(first());
  // }

  update(data: IModuleCenterEdit, centerId: string): Observable<ApiResponseModel> {
    return this.httpService.update(this.endpoint, data, centerId);
  }
}
