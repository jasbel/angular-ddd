import { IModuleCenterEdit, IModuleCenterSingle } from './module-center.interfaces';

export class ModuleCenterEditModel implements IModuleCenterEdit {
  moduleIds: string[];

  constructor(m?: ModuleCenterEditModel) {
    this.moduleIds = m?.moduleIds || [];
  }
}
