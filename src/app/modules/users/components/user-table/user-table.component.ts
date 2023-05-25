import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { sId } from 'src/app/utils';

interface IAllergyResidentInfo {
  id: sId;
  name: string;
  active: boolean;
}

export interface IRangeDate {
  fromDate: Date | null;
  toDate: Date | null;
}

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  loading$ = new BehaviorSubject<boolean>(false);

  dataEs = { name: 'Name' };
  objects: IAllergyResidentInfo[] = [];
  residentId: string = '';

  displayedColumns: ('select' | keyof IAllergyResidentInfo)[] = ['select', 'name'];
  dataSource = new MatTableDataSource<IAllergyResidentInfo>([]);
  selection = new SelectionModel<IAllergyResidentInfo>(true, []);

  private unsubscribe: Subscription[] = [];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor() {}

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

  changeSelect(row: IAllergyResidentInfo, $event: MatCheckboxChange) {
    this.selection.toggle(row);
  }
  getIsSelected(row: IAllergyResidentInfo) {
    const current = row;
    const _selected = this.selection.selected.map((s) => s);

    return _selected.includes(current);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
