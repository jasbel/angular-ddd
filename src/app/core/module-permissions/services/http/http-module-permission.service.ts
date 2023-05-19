import { Injectable } from '@angular/core';
import { ApiResponseModel } from '../../../../utils';
import { ModuleCreateModel, ModuleEditModel, ModuleInfoModel } from '../../models';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class HttpModulePermissionService {
  private endpoint: string = '/modules';

  constructor(private httpService: HttpService<ModuleInfoModel, ModuleCreateModel, ModuleEditModel>) {
    // httpService.ModelES = { ...ModulePermissionES, ...PermissionES };
  }

  findAll(queryString?: string): Observable<ApiResponseModel<ModuleInfoModel>> {
    return this.httpService.findAll(this.endpoint, queryString);
  }

  find(moduleId: string): Observable<ApiResponseModel<ModuleInfoModel>> {
    return this.httpService.find(this.endpoint, moduleId).pipe(first());
  }

  create(module: ModuleCreateModel): Observable<ApiResponseModel> {
    return this.httpService.create(this.endpoint, module);
  }

  update(module: ModuleEditModel, moduleId: string): Observable<ApiResponseModel> {
    return this.httpService.update(this.endpoint, module, moduleId);
  }

  delete(moduleId: string): Observable<ApiResponseModel> {
    return this.httpService.delete(this.endpoint, moduleId);
  }
}
