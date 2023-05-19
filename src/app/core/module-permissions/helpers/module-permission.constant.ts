import { IModulePermission } from "../models/module.interfaces";
import { IPermission } from "../models/permission.master.model";

export const PermissionES: { [key in keyof Required<IPermission>]: string } = {
  id: 'Id',
  name: "Nombre",
  code: "Codigo",
  moduleId: "Modulo"
};

export const ModulePermissionES: { [key in keyof Required<IModulePermission>]: string } = {
  id: 'Id',
  name: "Nombre",
  code: "Codigo",
  permissions: "Permisos"
};
