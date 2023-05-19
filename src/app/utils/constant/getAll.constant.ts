import { ArgsQueryString } from 'src/app/utils';

export const initPerPage = 100000;

export const initQueryTable: ArgsQueryString<any> = {
  pagesize: 20,
};

export const initQueryTableSmall: ArgsQueryString<any> = {
  pagesize: 256,
};
