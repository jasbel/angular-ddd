import { Route, Routes } from '@angular/router';
import { sModuleName, TActionPermission, TRole } from './global.interfaces';
import { INav } from './routeNavigation.interfaces';

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
