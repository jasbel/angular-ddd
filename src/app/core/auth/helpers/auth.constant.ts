import { IAuthUser } from '../models';

export const AuthES: { [key in keyof Required<IAuthUser>]: string } = {
  id: 'Id',
  name: 'Nombre',
  password: 'Contraseña',
  cPassword: 'Confirmar Contraseña',
};
