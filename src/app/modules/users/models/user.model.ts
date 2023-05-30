import { TRole, sId } from 'src/app/utils';
import { IUserCreate, IUserUpdate, IUserInfo } from './user.interface';

export class UserInfoModel implements IUserInfo {
  id: sId;
  username: string;
  password: string;
  role: TRole;

  constructor(m?: UserInfoModel) {
    this.id = m?.id! || '';
    this.username = m?.username || '';
    this.password = m?.password || '';
    this.role = m?.role! || '';
  }
}
export class UserUpdateModel implements IUserUpdate {
  username: string;
  password: string;
  role: TRole;

  constructor(m?: UserUpdateModel) {
    this.username = m?.username || '';
    this.password = m?.password || '';
    this.role = m?.role! || '';
  }
}
export class UserCreateModel extends UserUpdateModel implements IUserCreate {
  id: sId;

  constructor(m?: UserCreateModel) {
    super(m);
    this.id = m?.id! || '';
  }
}
