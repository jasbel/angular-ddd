import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isDev } from 'src/app/core/config';

import { IModelSingle, sDate, sFilter } from 'src/app/utils';

export type sFilterChart = sFilter | string[];
export type TTypeInputFilter = 'multicomplete' | 'text' | 'date' | 'datetime' | 'checkbox';

export type TChartFilter<I> = keyof I;
export type IChartFilterEmiter<I> = { field: TChartFilter<I>; value: sFilterChart };

type TFormItemSelect = {
  id: FormControl<string>;
  name: FormControl<string>;
};

type TFormItem<T = any> = {
  label: FormControl<string>;
  value: FormControl<any>;
  type: FormControl<TTypeInputFilter>;
  field: FormControl<T>;
  selects: FormArray<FormGroup<TFormItemSelect>>;
};

export interface IChartItemFilter<T = any> {
  label: string;
  value: sFilterChart;
  type: TTypeInputFilter;
  field: keyof T;
}

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent<I> implements OnInit {
  @Input() disabledCreate: boolean = false;
  @Input() filters: IChartItemFilter<I>[] = [];

  @Output() onChangeFilter = new EventEmitter<IChartFilterEmiter<I>>();
  @Output() onCreate = new EventEmitter<undefined>();
  @Output('onSearch') onDebounceSearch = new EventEmitter<string>();

  form = this.fb.group({
    filters: this.fb.array<FormGroup<TFormItem>>([]),
  });

  debouncer: Subject<string> = new Subject();

  get withMultiData() {
    return this.form.controls.filters.getRawValue().filter((a) => a.selects?.length)?.length;
  }
  get formItems() {
    return this.form.controls.filters;
  }

  constructor(public router: Router, private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.debouncer.pipe(debounceTime(420)).subscribe((valueInput) => {
      this.onDebounceSearch.emit(valueInput);
    });

    this.processDataFilter();
    // this.getAllDataForMultiple();
  }

  private processDataFilter() {
    console.log({ filter: this.filters });

    if (!this.filters?.length) return;

    this.formItems.clear();

    this.filters.forEach((f, idx) => {
      this.formItems.push(this.buildFilter(f));

      if (isDev && f.type === 'multicomplete') this.addSelect({ id: 'fulanitoid', name: 'fulanito' }, idx);
    });
  }

  /*  private getAllDataForMultiple() {
    const _multipleFields = this.filters.filter((f) => f.type === 'multicomplete').map((f) => f.field);

    _multipleFields.forEach((mfa) => {
      const _field: TDashMultiField = <any>mfa;
    });
  } */

  private buildFilter(_filter: IChartItemFilter) {
    return this.fb.group({
      label: [_filter?.label || '', []],
      value: [_filter?.value?.toString() || '', []],
      type: [_filter?.type || 'input', []],
      field: [_filter?.field || '', []] /* Validators.required */,
      selects: this.fb.array<FormGroup<TFormItemSelect>>([]),
    });
  }

  private onFilter(value: sFilterChart, field: TChartFilter<I>) {
    this.onChangeFilter.emit({ field, value });
  }

  private changeItemValue(value: sFilterChart, idx: number) {
    this.formItems.at(idx).controls.value.setValue(value);
  }

  onSelectAutocomplete(data: IModelSingle<any>, field: TChartFilter<I>, idx: number) {
    console.log({ data, field, idx });
  }

  onSearchAutocomplete(q: string, field: TChartFilter<I>, idx: number) {
    this.changeItemValue(q, idx);
    this.onFilter(q, field);
  }

  onSearchInput(text: string, field: TChartFilter<I>, idx: number) {
    this.changeItemValue(text, idx);
    this.onFilter(text, field);
  }

  onChangeDate(_date: sDate | '', field: TChartFilter<I>, idx: number) {
    this.changeItemValue(_date.toString(), idx);
    this.onFilter(_date.toString(), field);
  }

  onChangeDatetime(_datetime: sDate | '', field: TChartFilter<I>, idx: number) {
    this.changeItemValue(_datetime.toString(), idx);
    this.onFilter(_datetime.toString(), field);
  }

  onChangeCheckbox(bol: boolean | '', field: TChartFilter<I>, idx: number) {
    this.changeItemValue(bol, idx);
    this.onFilter(bol, field);
  }

  private addSelect(_select: IModelSingle<string>, idx: number) {
    this.formItems.at(idx).controls.selects.push(this.buildSelect(_select));
  }

  private buildSelect(_select: IModelSingle<string>) {
    return this.fb.group({
      id: [_select?.id || ''],
      name: [_select?.name?.toString() || ''],
    });
  }

  onRemoveSelect(idxParent: number, idxSelect: number) {
    this.formItems.at(idxParent).controls.selects.removeAt(idxSelect);
  }
}

/*
  private onSearchAll(e: KeyboardEvent) {
    const text = (e.target as HTMLInputElement).value;
    this.debouncer.next(text);
  }

  private getBooleanEs(bool: boolean) {
    return !!bool ? 'Si' : 'No';
  }

  private viewCreate() {
    this.onCreate.emit();
  }
  */
