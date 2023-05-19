export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class UserClass implements User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor(user?: User) {
    this.id = user?.id || 0;
    this.firstName = user?.firstName || '';
    this.lastName = user?.lastName || '';
    this.email = user?.email || '';
  }
}
