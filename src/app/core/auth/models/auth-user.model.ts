export interface AuthUser {
  id: number;
  password: string;
  cPassword: string;
  email: string;
}

export class AuthUserClass implements AuthUser {
  id: number;
  password: string;
  cPassword: string;
  email: string;

  constructor(m?: AuthUser) {
    this.id = m?.id || 0;
    this.password = m?.password || '';
    this.cPassword = m?.cPassword || '';
    this.email = m?.email || '';
  }
}

export class AuthUserModel extends AuthUserClass {}
export class AuthUserInfoModel extends AuthUserClass {}
