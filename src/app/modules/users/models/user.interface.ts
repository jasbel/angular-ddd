import { TRole, sId } from 'src/app/utils';

export interface IUser {
  id: sId;
  username: string;
  password: string;
  role: TRole;
  cPassword: string;
}

export interface IUserInfo extends Pick<IUser, 'id' | 'username' | 'password' | 'role'> {}
export interface IUserUpdate extends Pick<IUser, 'username' | 'password' | 'role'> {}
export interface IUserCreate extends IUserUpdate, Pick<IUser, 'id'> {}
