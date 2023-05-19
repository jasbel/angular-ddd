import {IPermission} from "./permission.master.model";

export class PermissionEditModel implements Omit<IPermission, 'id'> {
  code!: string;
  moduleId!: string;
  name!: string;
}
