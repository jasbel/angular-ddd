export enum ERole {
  super_admin = 'Administrador',
}

export type TRole = keyof typeof ERole;

export enum EModuleNameToEs {
  roles = 'Gestión Roles',
  users = 'Gestión Usuarios',
}

export type sModuleName = keyof typeof EModuleNameToEs | 'generic' | '';
export type TModuleToEs = { [key in keyof typeof EModuleNameToEs]: string };

export type TActionPermissionCore = 'create' | 'update' | 'list' | 'delete';
export type TActionPermission = TActionPermissionCore | 'all';
export type TModulePermission = `${sModuleName}_${TActionPermission}`;

export type IPermissionActions = { [key in sModuleName]: TActionPermission[] };
