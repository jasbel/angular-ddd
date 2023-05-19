import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TModeFilter, sDate } from 'src/app/utils';
import { dafaultTime } from 'src/app/utils/config';

export interface IRangeDate {
  fromDate: Date | null;
  toDate: Date | null;
}

@Component({
  selector: 'filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent implements OnInit {
  @Input() showTableMenu: boolean = false;
  @Input() pageLength: number = 20;
  @Input() page: number = 1;

  @Input() mode: TModeFilter = 'local';

  @Input() dataFilter: { active: boolean } = {
    active: false,
  };
  // @Input() initFilter: { active?: boolean };

  @Output('pageChange') _pageChange: EventEmitter<boolean> = new EventEmitter();
  @Output('pageLenChange') _pageLenChange: EventEmitter<boolean> =
    new EventEmitter();
  // @Output('search') _search: EventEmitter<string> = new EventEmitter();
  @Output('search') _search: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output('filterActive') _filterActive: EventEmitter<Event> =
    new EventEmitter();

  isActive: '' | '1' | '0' = '';

  private debouncerSearch: Subject<KeyboardEvent> = new Subject();

  ngOnInit(): void {
    /* if (this.initFilter) {
      const { active } = this.initFilter;
      if (!!active) this.isActive = '1';
      if (active === false) this.isActive = '0';
    }

    if (this.mode === 'server')
      this.debouncerSearch
        .pipe(debounceTime(dafaultTime))
        .subscribe((e) => this._search.emit(e)); */
  }

  pageChange(up: boolean) {
    this._pageChange.emit(up);
  }

  pageLenChange(up: boolean) {
    this._pageLenChange.emit(up);
  }

  search(e: KeyboardEvent) {
    const _q = (e.target as HTMLInputElement).value;

    if (this.mode !== 'server') this._search.emit(e);
    else this.debouncerSearch.next(e);
  }

  filterActive(e: Event) {
    this._filterActive.emit(e);
  }
}
