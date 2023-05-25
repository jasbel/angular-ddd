import { ArgsQueryString } from 'src/app/utils';

export const initPerPage = 100000;

export const initQueryTable: ArgsQueryString<unknown> = {
  pagesize: 20,
};

export const initQueryTableSmall: ArgsQueryString<unknown> = {
  pagesize: 256,
};
