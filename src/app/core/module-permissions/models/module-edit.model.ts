import { sModuleName } from 'src/app/utils';
import { IModulePermission } from './module.interfaces';
import { PermissionInfoModel } from './permission.info.model';

export class ModuleEditModel implements Omit<IModulePermission, 'id'> {
  code: sModuleName = '';
  name: string = '';
  permissions: PermissionInfoModel[] = [];
}
