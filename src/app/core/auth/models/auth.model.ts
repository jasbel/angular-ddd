import { TRole, TModulePermission, TModuleToEs, sId } from 'src/app/utils';

export class UserAuthModel {
  public id!: sId;
  username!: string;
  name!: string;
  token!: string;
  modules!: TModuleToEs;

  permissions!: TModulePermission[];
  role!: TRole;
}
