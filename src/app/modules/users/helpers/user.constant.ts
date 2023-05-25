import { User } from "../models";

export const UserES: { [key in keyof Required<User>]: string } = {
  id: 'Id',
  firstName: "Nombre",
  lastName: "Apellido",
  email: "Email"
};
