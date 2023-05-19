import { sId } from 'src/app/utils';
import { IPermission } from './permission.master.model';

export class PermissionCreateModel implements IPermission {
  id!: sId;
  code!: string;
  moduleId!: string;
  name!: string;
}
