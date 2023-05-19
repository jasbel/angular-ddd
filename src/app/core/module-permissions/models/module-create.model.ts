import { sModuleName } from 'src/app/utils';
import { IModulePermission } from './module.interfaces';
import { IPermission } from './permission.master.model';

export class ModuleCreateModel implements Omit<IModulePermission, 'id'> {
  code: sModuleName = '';
  name: string = '';
  permissions: IPermission[] = [];

  constructor(module: Partial<ModuleCreateModel>) {
    Object.assign(this, module);
  }
}
