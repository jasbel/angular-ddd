import { IModulePermission } from './module.interfaces';

export interface IModuleCenterSingle extends Pick<IModulePermission, 'id' | 'name'> {
  active: boolean;
}

export interface IModuleCenterInfo extends Pick<IModulePermission, 'id' | 'name'> {
  active: boolean;
}
export interface IModuleCenterEdit {
  moduleIds: string[];
}
export interface IModuleCenterCreate extends IModuleCenterEdit {}
