import { EMode, ETypePay, ITotalizerSingle, TMode } from './../../models/totalizer.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { TRoutePattern, sId } from 'src/app/utils';
import { TotalizerService } from '../../services';
import { ITotalizer, ITotalizerInfo } from '../../models';
import { QueryString } from 'src/app/core/classes';
import { TotalizerES, TotalizerSingleES } from '../../helpers';

export interface IRangeDate {
  fromDate: Date | null;
  toDate: Date | null;
}

@Component({
  selector: 'totalizer-info',
  templateUrl: './totalizer-info.component.html',
  styleUrls: ['./totalizer-info.component.scss'],
})
export class TotalizerInfoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  loading$ = new BehaviorSubject<boolean>(false);

  dataSingleEs = TotalizerSingleES;
  dataEs = TotalizerES;
  typePayEs = ETypePay;

  data: ITotalizerInfo[] = [];
  itemId: string = '';
  mode: TMode = 'analysis';
  modeEs = EMode;
  disabledMode = false;

  displayedColumns: ('select' | 'actions' | keyof ITotalizerInfo)[] = ['select', 'actions'];
  dataSource = new MatTableDataSource<ITotalizerInfo>([]);
  selection = new SelectionModel<ITotalizerInfo>(true, []);
  queryString = new QueryString<ITotalizerInfo>();

  get item(): ITotalizer {
    const mockSingle: ITotalizerSingle = {
      id: <sId>'asdasfd',
      typePay: 'cash',
      totalSale: 10,
      totalCollection: 12,
    };
    const mockSingle2: ITotalizerSingle = {
      id: <sId>'asdasfd',
      typePay: 'creditCard',
      totalSale: null,
      totalCollection: 12,
    };

    const mock: ITotalizer = {
      id: <sId>'asdfasdf',
      collection: [mockSingle, mockSingle2, mockSingle],
      total: 1000,
      depositValues: 1000,
      amount: 1000,
      printedTickets: 1000,
      nonPrintedTickets: 1000,
      amountTotal: 1000,
    };

    return mock;
  }

  private unsubscribe: Subscription[] = [];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private route: ActivatedRoute, private router: Router, private totalizerService: TotalizerService) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.loading$.next(true);
    const subsc = this.totalizerService
      .findAll(this.queryString.string)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe((res) => {
        if (!res) return;
        this.data = res;
        this.dataSource.data = this.data;
        this.disabledMode = true;
      });

    this.unsubscribe.push(subsc);
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

  changeSelect(row: ITotalizerInfo, $event: MatCheckboxChange) {
    this.selection.toggle(row);
  }

  getIsSelected(row: ITotalizerInfo) {
    const current = row;
    const _selected = this.selection.selected.map((s) => s);

    return _selected.includes(current);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
