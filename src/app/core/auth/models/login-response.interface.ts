import { sId } from 'src/app/utils';

type TRole = 'super_admin';
export type TModule = 'user';
type TPermission = 'delete' | 'update' | 'create' | 'list';

export interface LoginResponse {
  token: string;
  id: sId;
  name: string;
  role: TRole;
  permissions: `${TModule}_${TPermission}`[];
  modules: { [key in TModule]: string };
}

export interface IUserLogin extends Pick<LoginResponse, 'id' | 'name'> {}
