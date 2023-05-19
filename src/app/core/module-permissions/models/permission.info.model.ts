import { sId } from "src/app/utils";
import {IPermission} from "./permission.master.model";

export class PermissionInfoModel implements IPermission {
  id!: sId;
  name!: string;
  code!: string;
  moduleId!: string;
  roleId?: string;
  checked?: boolean = false;
}
