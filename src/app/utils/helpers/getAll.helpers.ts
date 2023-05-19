import { IQueryString, ISort } from '../interfaces';
import { removeNullEmptyOrUndefined } from './string.helpers';

/**
 * @param {active: '', search: '123', other: false, zero: 0, nullys: 'null', }
 * @return ? search=123 & other: false & zero=0
 */
export const getQueryStringByObject = <T extends object>(dataQuery: T): string => {
  const _dataQuery = removeNullEmptyOrUndefined(dataQuery);
  if (JSON.stringify(_dataQuery) === '{}') return '';

  let query = '';

  Object.keys(_dataQuery).forEach((k) => (query += `${[k]}=${_dataQuery[k]}&`));

  if (query) query = '?' + query.slice(0, -1);

  return query;
};

/**
 * @return {"filter": {"name": "asbl"},"order": {"createdDate": "ASC"},"page": 1,"pagesize": 10}
 */
export const getQueryString = <T extends object, F = T>(dataQuery?: IQueryString<T, F>): string => {
  const objectQueryString = dataQuery ? `?filters=${JSON.stringify(dataQuery)}` : '';

  return objectQueryString;
};

/**
 * @return {"filter": {"name": "asbl"},"order": {"createdDate": "ASC"}}
 */
export const getQueryStringFilter = <T extends object, F = T>(dataQuery?: IQueryString<T, F>): string => {
  const _dataQuery = { ...dataQuery };
  delete _dataQuery.page;
  delete _dataQuery.pagesize;
  const objectQueryString = _dataQuery ? `?filters=${JSON.stringify(_dataQuery)}` : '';
  return objectQueryString;
};

/* Missing Verify ----------------- */
export const getFilterString = <T extends Object>(filter: T): string => {
  const currentFilter = JSON.stringify(filter);
  return currentFilter;
};

export const getSortString = <T extends Object>(sort: ISort<T>): string => {
  const currentSort = Object.entries(sort).reduce((str, [field, order]) => {
    if (!order) return str;
    if (!str) return `${field}:${order}`;
    return `${str},${field}:${order}`;
  }, '');
  return currentSort;
};

export const initQueryAll: IQueryString<any> = {
  pagesize: 1000,
};
export const getInitQuery = () => getQueryString(initQueryAll);
