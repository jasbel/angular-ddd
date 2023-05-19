import { sId, sModuleName } from 'src/app/utils';
import { IModulePermission } from './module.interfaces';
import { PermissionInfoModel } from './permission.info.model';

export class ModuleInfoModel implements IModulePermission {
  code: sModuleName = "";
  id!: sId;
  name!: string;
  permissions: PermissionInfoModel[] = [];
}
