import { sId, sModuleName } from 'src/app/utils';
import { IPermission } from './permission.master.model';

export interface IModulePermission {
  id: sId;
  name: string;
  code: sModuleName;
  permissions: IPermission[];
}
