import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogoComponent } from './components/logo.components';
import { InputControlComponent } from './components/input-control.components';
import { SubmitControlComponent } from './components/submit-control.components';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { TableComponent } from './components/table/table.component';
import { FilterComponent } from './components/filter/filter.component';
import { SelectControlComponent } from './components/select-control.components';

@NgModule({
  declarations: [
    HeaderTitleComponent,
    FilterTableComponent,
    LoaderComponent,
    SpinnerComponent,
    ErrorDisplayComponent,
    LogoComponent,
    InputControlComponent,
    SelectControlComponent,
    SubmitControlComponent,
    FormTitleComponent,
    TableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  exports: [
    HeaderTitleComponent,
    FilterTableComponent,
    LoaderComponent,
    SpinnerComponent,
    ErrorDisplayComponent,
    LogoComponent,
    InputControlComponent,
    SelectControlComponent,
    SubmitControlComponent,
    FormTitleComponent,
    TableComponent,
    FilterComponent
  ],
})
export class SharedModule {}
