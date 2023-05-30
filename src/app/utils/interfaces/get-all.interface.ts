export type TOrder = 'ASC' | 'DESC';
export type TFilterValue = string | number | boolean;

export type ISort<T> = { [k in keyof T]: TOrder };
export type IFilter<T> = { [k in keyof Partial<T>]: TFilterValue };

export interface ITableHeader<T> {
  key?: keyof T;
  label: string;
  state?: TOrder;
  sortable?: boolean;
}

export interface IQueryString<T, F = T> {
  filter?: Partial<F> & { search?: string };
  order?: ISort<Partial<T>>;
  page?: number;
  pagesize?: number;
}

export interface InfoTable {
  total: number;
  loading: boolean;
  perPage: number;
  page: number;
}

export type OnChangePage = (page: number, perPage: number) => void;
export interface DateFromTo {
  from: string;
  to: string;
}

export type TDataFilterQuery<T> = { field: keyof T; value: string };

export interface IConfigGetAll {
  id?: string;
  hiddenError?: boolean;
  hiddenToast?: boolean;
  clear?: boolean;
}
