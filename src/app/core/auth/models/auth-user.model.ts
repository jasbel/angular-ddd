export interface IAuthUser {
  id: number;
  password: string;
  cPassword: string;
  name: string;
}
export interface IAuthUser {
  id: number;
  password: string;
  cPassword: string;
  name: string;
}

export class AuthUserModel implements IAuthUser {
  id: number;
  password: string;
  cPassword: string;
  name: string;

  constructor(m?: IAuthUser) {
    this.id = m?.id || 0;
    this.password = m?.password || '';
    this.cPassword = m?.cPassword || '';
    this.name = m?.name || '';
  }
}
export class LoginModel implements Pick<IAuthUser, 'name' | 'password'> {
  password: string;
  name: string;

  constructor(m?: IAuthUser) {
    this.password = m?.password || '';
    this.name = m?.name || '';
  }
}
