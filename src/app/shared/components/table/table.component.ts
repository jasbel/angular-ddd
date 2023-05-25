import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { sId } from 'src/app/utils';

interface IDisplayColumns {
  id: string /* sId */;
  name: string;
}

export interface IRangeDate {
  fromDate: Date | null;
  toDate: Date | null;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends Object = IDisplayColumns> implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  @Input({ required: true }) columns!: (keyof T)[];
  @Input({ required: true }) columnEs!: { [key in keyof T]: string };
  @Input({ required: true }) data: T[] = [];
  @Input() loading: boolean = false;
  @Input() loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  displayedColumns: string[] = [];
  dataEs: { [key: string]: string } = {};

  dataSource = new MatTableDataSource<T>([]);
  selection = new SelectionModel<T>(true, []);

  private unsubscribe: Subscription[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const _data: T[] = changes['data']?.currentValue;
    const _columnEs: { [key in keyof T]: string } = changes['columnEs']?.currentValue;

    if (_data) this.dataSource.data = _data;
    if (_columnEs) this.dataEs = _columnEs;

    console.log({ _data });
  }

  ngAfterViewInit() {
    this.displayedColumns = <string[]>this.columns;
    this.dataSource.sort = this.sort;
  } 

  ngOnInit(): void {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  changeSelect(row: T, $event: MatCheckboxChange) {
    this.selection.toggle(row);
  }
  getIsSelected(row: T) {
    const current = row;
    const _selected = this.selection.selected.map((s) => s);

    return _selected.includes(current);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
