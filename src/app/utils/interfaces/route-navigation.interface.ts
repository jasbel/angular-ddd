import { sId } from './api.interface';

export type TPath = 'dashboard' | 'users' | 'collections';
export type TActionPath = 'list' | 'create' | 'edit' | `edit/:${sId}` | ':id';
export type TTypeId = 'id';

export type INav =
  | ''
  | TActionPath
  | `${TActionPath}/:${TTypeId}`
  | `${TPath}`
  | `${TPath}/:${sId}`
  | `${TPath}/${TActionPath}`
  | `${TPath}/${TActionPath}/:${TTypeId}`
  | '**';

export type TRoutePattern =
  | `/`
  | `/auth/login`
  | `/dashboard`
  | `/collections`
  | `/collections/create`
  | `/users`
  | `/users/create`
  | `/users/list`
  | `/users/${sId}`;
