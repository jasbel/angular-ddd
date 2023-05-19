import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LogoComponent } from './components/logo.components';
import { InputControlComponent } from './components/input-control.components';
import { SubmitControlComponent } from './components/submit-control.components';
import { FormTitleComponent } from './components/form-title/form-title.component';

@NgModule({
  declarations: [
    HeaderTitleComponent,
    FilterTableComponent,
    LoaderComponent,
    SpinnerComponent,
    ErrorDisplayComponent,
    LogoComponent,
    InputControlComponent,
    SubmitControlComponent,
    FormTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
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
    SubmitControlComponent,
    FormTitleComponent,
  ],
})
export class SharedModule {}
