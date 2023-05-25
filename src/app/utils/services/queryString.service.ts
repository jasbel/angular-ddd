import {
  IFilter,
  IQueryString,
  initPerPage,
  getQueryString,
  getQueryStringFilter,
  removeNullEmptyOrUndefined,
  TFilterValue,
  ISort,
  consoleLog,
} from '..';

export interface ArgsQueryString<F> {
  pagesize?: number;
  filter?: IFilter<F>;
  callback?: () => void;
}

export class QueryString<T extends object, F = T> {
  private pagesize: number;
  private dataQuery: IQueryString<T, F>;
  public queryString: string;

  constructor(args?: ArgsQueryString<F>) {
    const { pagesize: _pagesize = initPerPage, filter } = args || {};
    this.pagesize = _pagesize;
    this.dataQuery = { pagesize: _pagesize || ('' as unknown as number) };
    if (filter) this.setFilter(filter);
    this.queryString = getQueryString<T, F>(this.dataQuery);
  }

  get string() {
    return this.queryString;
  }

  get page() {
    return this.dataQuery?.page || 1;
  }

  get perPage() {
    return this.dataQuery?.pagesize || this.pagesize;
  }

  public getQuery(): string {
    return this.string;
  }

  public getQueryFilter(): string {
    return getQueryStringFilter<T, F>(this.dataQuery);
  }

  public getPage(): number {
    return this.page;
  }
  public getPerPage(): number {
    return this.perPage;
  }

  public setFilter = (filter: IFilter<F>) => {
    const _filter = removeNullEmptyOrUndefined({
      ...(this.dataQuery.filter || {}),
      ...filter,
    });

    this.dataQuery = { ...this.dataQuery, filter: _filter };
    this.changeQueryString();
  };

  public getSearch = () => {
    return this.dataQuery.filter?.search || '';
  };

  public getFilter = (_filter: keyof Partial<F>): TFilterValue | undefined => {
    const _filterValue = (this.dataQuery?.filter || ({} as Partial<F>))[_filter] as TFilterValue | undefined;

    return _filterValue;
  };

  public setSort = (sort: ISort<Partial<T>>) => {
    this.dataQuery = {
      ...this.dataQuery,
      order: { ...removeNullEmptyOrUndefined(sort) },
    };
    this.changeQueryString();
  };

  public setSearch = (q: string) => {
    const _filter = this.dataQuery.filter || ({} as Partial<F> & { search?: string | undefined });
    _filter!.search = q;
    this.dataQuery = {
      ...this.dataQuery,
      filter: removeNullEmptyOrUndefined(_filter),
    };
    this.changeQueryString();
  };

  public setPageSize = (pagesize: number) => {
    this.dataQuery = { ...this.dataQuery, pagesize };
    this.changeQueryString();
  };

  public setPage = (page: number) => {
    this.dataQuery = { ...this.dataQuery, page };
    this.changeQueryString();
  };

  public setPaginate = (page: number, pagesize: number) => {
    this.dataQuery = { ...this.dataQuery, page, pagesize };
    this.changeQueryString();
  };

  private changeQueryString = () => {
    // clear undefined
    const _queryString = getQueryString<T, F>(this.dataQuery);
    this.queryString = _queryString;
    consoleLog(this.queryString);
    // callback && callback();
  };
}
