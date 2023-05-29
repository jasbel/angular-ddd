import { FormControl, FormGroup } from '@angular/forms';
import { sDate, sId } from './api.interfaces';

export type TypeFromEnum<T> = `${Extract<T, string>}`; /* extends `${infer N extends string}` ? N : never; */

export type TypeKeyFromEnum<T> = keyof T;

export type TView = 'create' | 'edit' | 'list' | undefined;

/** Formato de fecha dd/MM/yyyy
 * @example 10/28/2022 */
export type TDateES = `${number}/${number}/${number}`;

/** Formato de fecha yyyy-MM-dd
 * @example 2022-10-28 */
export type TDateDB = `${number}-${number}-${number}`;

export enum ERole {
  super_admin = 'Administrador',
}
export type TRole = keyof typeof ERole;

export enum EModuleNameToEs {
  roles = 'Gestión Roles',
  users = 'Gestión Usuarios',
}

export enum EMonth {
  january = 1,
  february = 2,
  march = 3,
  april = 4,
  may = 5,
  june = 6,
  july = 7,
  august = 8,
  september = 9,
  october = 10,
  november = 11,
  december = 12,
}

export enum EMonthToEs {
  january = 'Enero',
  february = 'Febrero',
  march = 'Marzo',
  april = 'Abril',
  may = 'Mayo',
  june = 'Junio',
  july = 'Julio',
  august = 'Agosto',
  september = 'Septiembre',
  october = 'Octubre',
  november = 'Noviembre',
  december = 'Diciembre',
}
export type TMonthEs = TypeFromEnum<EMonthToEs>;

export enum EWeekDayNumber {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export enum EWeekDay {
  Monday = 'Lunes',
  Tuesday = 'Martes',
  Wednesday = 'Miercoles',
  Thursday = 'Jueves',
  Friday = 'Viernes',
  Saturday = 'Sábado',
  Sunday = 'Domingo',
}

export type TNumWeekly = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TNumBiweekly = TNumWeekly | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type TNumMonth =
  | TNumBiweekly
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type TWeekDay = keyof typeof EWeekDay;
export type TWeekDayES = TypeFromEnum<EWeekDay>;

export type sModuleName = keyof typeof EModuleNameToEs | 'generic' | '';
export type TModuleToEs = { [key in keyof typeof EModuleNameToEs]: string };

export type TActionPermissionCore = 'create' | 'update' | 'list' | 'delete';
export type TActionPermission = TActionPermissionCore | 'all';
export type TModulePermission = `${sModuleName}_${TActionPermission}`;

export type IPermissionActions = { [key in sModuleName]: TActionPermission[] };

export enum ETypeTitle {
  viewer = 'Ver',
  list = 'Listado',
  create = 'Crear',
  update = 'Actualizar',
}
export type TTypeTitle = keyof typeof ETypeTitle;

export type TTypeForm = 'create' | 'update';

export type TTypeFormExtends = TTypeForm | 'viewer';

export type KeyLoad = { [key: string]: boolean };

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;
export interface IModelSingle<T = sId, E = string> {
  id: T;
  name: E;
}

export type IEnum<E> = { [key in keyof E]: string };
export type IEnumObject<T extends string | number | symbol = string> = { [key in T]: string };

export type TDatePeriod = 'pass' | 'present' | 'future';

export type TAddEntity<TS extends string = string> = {
  [key in TS]: string;
} & {
  id: sId | 'ADD_ENTITY';
  create: string;
};

export type TEnumLocalize<T = object> = {
  es: IEnum<T>;
  ca: IEnum<T>;
};

export class AppendEntity {
  id: sId | 'ADD_ENTITY';
  name: string;

  constructor(m?: AppendEntity) {
    this.id = m?.id! || 'ADD_ENTITY';
    this.name = m?.name || 'Agregar';
  }
}

export type TModeFilter = 'local' | 'server';
