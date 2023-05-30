import { IUser } from '../models';

export const UserES: { [key in keyof Required<IUser>]: string } = {
  id: 'Id',
  username: 'Nombre',
  password: 'Contraseña',
  cPassword: 'Confirmar Contraseña',
  role: 'Rol',
};
