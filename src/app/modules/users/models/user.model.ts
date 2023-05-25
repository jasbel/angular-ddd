import { User } from './user.interface';

export class UserClass implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(m?: User) {
    this.id = m?.id || '';
    this.firstName = m?.firstName || '';
    this.lastName = m?.lastName || '';
    this.email = m?.email || '';
  }
}

export class UserModel extends UserClass {}
export class UserInfoModel extends UserClass {}
