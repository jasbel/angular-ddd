import { sId } from 'src/app/utils';

export interface IUser {
  id: sId;
  name: string;
  password: string;
  cPassword: string;
}

export interface IUserInfo extends Pick<IUser, 'id' | 'name' | 'password'> {}
export interface IUserUpdate extends Pick<IUser, 'name' | 'password'> {}
export interface IUserCreate extends IUserUpdate, Pick<IUser, 'id'> {}
