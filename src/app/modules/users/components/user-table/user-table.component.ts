import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { QueryString, TRoutePattern, isDev, sId } from 'src/app/utils';
import { UserService } from '../../services';
import { IUserInfo } from '../../models';
import { v4 } from 'uuid';
import { mockDataUser } from '../../helpers/user.mock';

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
  objects: IUserInfo[] = [];
  itemId: string = '';

  displayedColumns: ('select' | 'actions' | keyof IUserInfo)[] = ['select', 'name', 'actions'];
  data: IUserInfo[] = [];
  dataSource = new MatTableDataSource<IUserInfo>([]);
  selection = new SelectionModel<IUserInfo>(true, []);
  queryString = new QueryString<IUserInfo>();

  private unsubscribe: Subscription[] = [];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.loading$.next(true);
    const subsc = this.userService
      .findAll(this.queryString.string)
      .pipe(finalize(() => (this.loading$.next(false), this.mock())))
      .subscribe((res) => {
        if (!res) return;
        this.data = res;
        this.dataSource.data = this.data;
      });

    this.unsubscribe.push(subsc);
  }

  private mock() {
    if (isDev) {
      this.data = mockDataUser;
    }
  }

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

  changeSelect(row: IUserInfo, $event: MatCheckboxChange) {
    this.selection.toggle(row);
  }

  getIsSelected(row: IUserInfo) {
    const current = row;
    const _selected = this.selection.selected.map((s) => s);

    return _selected.includes(current);
  }

  onEdit(id: sId) {
    const _link: TRoutePattern = `/users/${id}`;
    this.router.navigate([_link]);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
