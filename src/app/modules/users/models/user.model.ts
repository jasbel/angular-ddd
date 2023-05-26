import { sId } from 'src/app/utils';
import { IUser, IUserCreate, IUserUpdate, IUserInfo } from './user.interface';

export class UserInfoModel implements IUserInfo {
  id: sId;
  name: string;
  password: string;

  constructor(m?: UserInfoModel) {
    this.id = m?.id! || '';
    this.name = m?.name || '';
    this.password = m?.password || '';
  }
}
export class UserUpdateModel implements IUserUpdate {
  name: string;
  password: string;

  constructor(m?: UserUpdateModel) {
    this.name = m?.name || '';
    this.password = m?.password || '';
  }
}
export class UserCreateModel extends UserUpdateModel implements IUserCreate {
  id: sId;

  constructor(m?: UserCreateModel) {
    super(m);
    this.id = m?.id! || '';
  }
}
