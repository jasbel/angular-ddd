import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TModeFilter } from 'src/app/utils';
import { dafaultTime } from '../config';

export interface ArgsPage {
  perPage?: number;
  page?: number;
  mode?: TModeFilter;
  // total?: number;
  // count?: number;
}

export class Pager {
  private _pageLength = 10;
  private _pageLengthMin = 10;
  private _pageLengthMax = 100;

  private _page = 1;
  private _pageMin = 1;
  private _pageMax = 1000;

  private _count = 0;

  private _initPage = 1000;
  private _initPerPage = 10;

  debouncer$ = new BehaviorSubject<number>(0);
  private debouncerSubject$ = new Subject();
  private debouncerCount = 0;

  constructor(args?: ArgsPage) {
    const { perPage, page, mode } = args || {};

    if (perPage) this._pageLength = perPage;
    if (perPage) this._initPerPage = perPage;

    if (page) this._page = page;
    if (page) this._initPage = page;

    mode === 'server' &&
      this.debouncerSubject$
        .pipe(debounceTime(dafaultTime))
        .subscribe((e) => this.debouncer$.next(++this.debouncerCount));
  }

  get page() {
    return this._page || 1;
  }

  get perPage() {
    return this._pageLength;
  }

  get pageLength() {
    return this._pageLength;
  }

  get pageLengthMax() {
    return this._pageLengthMax;
  }
  get pageLengthMin() {
    return this._pageLengthMin;
  }

  get total(): number {
    if (!this._pageLength) return 0;

    return Math.ceil(this._count / this._pageLength);
  }

  public setCount = (count: number) => {
    this._count = count;
    this.rePageMax();
  };
  private rePageMax() {
    this._pageMax = Math.ceil(this._count / this._pageLength);
  }

  public resetPaginate = () => {
    this._page = this._initPage;
    this._pageLength = this._initPerPage;
  };

  public resetPage = () => {
    this._page = this._initPage;
  };

  public setPageLenUp = (up: boolean) => {
    const _pLength = this._pageLength;
    if (up && _pLength < this._pageLengthMax) this._pageLength = _pLength + 1;
    if (!up && _pLength > this._pageLengthMin) this._pageLength = _pLength - 1;

    this.debouncerSubject$.next(undefined);
  };

  public setPageUp = (up: boolean) => {
    const _page = this._page + (up ? 1 : -1);

    if (!(this._pageMin <= _page && _page <= this._pageMax)) return;

    this._page = _page;
    this.debouncerSubject$.next(undefined);
  };

  public setPerPage = (pageLength: number) => {
    this._pageLength = pageLength;

    this.debouncerSubject$.next(undefined);
  };
}
