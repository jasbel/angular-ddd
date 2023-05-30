import { Route, Routes } from '@angular/router';
import { INav } from './route-navigation.interface';
import { TActionPermission, TRole, sModuleName } from './role-permission.interface';

type RouteData = {
  // title: string;
  returnUrl?: string;
  permission?: [module: sModuleName, action: TActionPermission];
  roles?: TRole[];
};

interface CustomRouteBase extends Route {
  path?: INav;
  data?: RouteData;
}

type CustomRoute = CustomRouteBase & {
  children?: CustomRoutes;
};

export type CustomRoutes = CustomRoute[] & {
  // path?: INav,
  children?: CustomRoutes;
};
