import { IPermissionActions, sModuleName, TActionPermission } from '../../../utils/interfaces';

export const separeModuleAndPermission = (permissionString: string[]): [module: sModuleName, permission: TActionPermission][] => {
  if (!permissionString) return [];

  const arrayModulePermission: [module: sModuleName, permission: TActionPermission][] = permissionString
    .map((pStr) => pStr.split('_'))
    .map((modPerm) => [modPerm.slice(0, -1).join('_') as sModuleName, modPerm.slice(-1).toString() as TActionPermission]);

  return arrayModulePermission;
};

export const joinKeyModuleWithPermissions = (permissions: [module: sModuleName, permission: TActionPermission][]): IPermissionActions => {
  if (!permissions) return {} as IPermissionActions;

  const actionsModule: IPermissionActions = permissions.reduce((totalPermission, objActionView) => {
    const view = objActionView[0];
    const action = objActionView[1];
    const _currentActionsByModule = totalPermission[view] ? [...totalPermission[view], action] : [action];
    const _totalPermission = { ...totalPermission, [view]: _currentActionsByModule };
    return _totalPermission;
  }, {} as IPermissionActions);

  return actionsModule;
};
