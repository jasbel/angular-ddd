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
  doctor = 'Medico',
  group_manager = 'Director de grupo',
  center_manager = 'Director de centro',
  manager = 'Gerente',
  shr = 'RHS (Responsable higiénico sanitario)',
  nurse = 'DUE (Enfermera)',
  social_worker = 'Trabajadora social',
  social_educator = 'Educadora social',
  psychologist = 'Psicólogo',
  auxiliary = 'Auxiliar',
  physiotherapist = 'Fisioterapeuta',
  occupational_therapist = 'Terapeuta ocupacional',
  hairdresser = 'Peluquera',
  podiatrist = 'Podólogo',
  supervisor = 'Supervisor',
  sociocultural_animator = 'Animador sociocultural',
  dietitian = 'Dietista',
  pharmacist = 'Farmacéutico',
  family = 'Familiar',
}
export type TRole = keyof typeof ERole;

export enum EModuleNameToEs {
  activities = 'Actividades',
  billings = 'Facturación',
  centers = 'Gestión Centros',
  cleaning_maintenance = 'Limpieza y mantenimiento',
  contracts_documentation = 'Contratos y documentación',
  crm = 'Gestión comercial/CRM ',
  daily_living_activities = 'Gestión Registros AVDs',
  dashboard_reporting = 'Dashboard/Reporting',
  employees = 'Gestión Trabajadores', // 'Empleados',
  groups = 'Gestión Grupos',
  inspection = 'Inspección',
  kitchen = 'Cocina',
  laundry = 'Lavandería',
  resident_incidents = 'Incidencias residentes',
  residents = 'Residentes',
  roles = 'Gestión Roles',
  pharmacies = 'Farmacias',
  users = 'Gestión Usuarios', //'Gestión Usuarios/Trabajadores',
  work_calendar = 'Calendario de Avisos',
  center_occupation = 'Ocupacion Centro',
  template_manager = 'Gestión de Plantillas',
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
export type TNumMonth = TNumBiweekly | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;

export type TWeekDay = keyof typeof EWeekDay;
export type TWeekDayES = TypeFromEnum<EWeekDay>;

/* type ValueOf<T> = T[keyof T];
type Foo = { a: string, b: number };
type ValueOfFoo = ValueOf<EWeekDay>;

type FooType = keyof Record<EWeekDay, string>;
const a: ValueOfFoo = 'asdf';
*/

// const ModuleNameToEs: { [key in Exclude<sModuleName, '' | 'super'>]: string } = {};
export type sModuleName = keyof typeof EModuleNameToEs | 'generic' | '';
export type TModuleToEs = { [key in keyof typeof EModuleNameToEs]: string };

export type TActionPermissionCore = 'create' | 'update' | 'list' | 'delete' | 'history' | 'register';
export type TActionPermission = TActionPermissionCore | 'all' | 'chat' | 'login-center' | '_' | 'any';
export type TModulePermission = `${sModuleName}_${TActionPermission}`;

export type IPermissionActions = { [key in sModuleName]: TActionPermission[] };

export enum EMeal {
  breakfast = 'Desayuno',
  lunch = 'Comida',
  snack = 'Merienda',
  dinner = 'Cena',
  after = 'Recena',
}
export type TMeal = keyof typeof EMeal;

export enum EMeal2 {
  'Breakfast' = 'Desayuno',
  'Lunch' = 'Comida',
  'Snack' = 'Merienda',
  'Dinner' = 'Cena',
  'Second Dinner' = 'Resopon',
}
export type TMeal2 = keyof typeof EMeal2;
export type TMealEs2 = TypeFromEnum<EMeal2>;

export enum ERecursiveDate {
  'non' = 'Nunca', //'No recurrente',
  'date' = 'Fecha', // fecha
  'daily' = 'Diariamente', // dias
  'weekly' = 'Semanalmente',
  'biweekly' = 'Quincenal',
  'monthly' = 'Mensualmente',
  // 'custom' = 'Personalizado',
}

export type TRecursiveDate = keyof typeof ERecursiveDate;

export enum ETypeTitle {
  'viewer' = 'Ver',
  'list' = 'Listado',
  'create' = 'Crear',
  'update' = 'Actualizar',
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

export type TModeFilter = 'local' | 'server'
