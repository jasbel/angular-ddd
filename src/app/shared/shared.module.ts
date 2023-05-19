import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { NgModule } from '@angular/core';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDialogModule } from '@angular/material/dialog';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { RouterModule } from '@angular/router';

// import { CustomDaysComponent } from './components/custom-days/custom-days.component';

@NgModule({
  declarations: [
    HeaderTitleComponent,
    FilterTableComponent,
    LoaderComponent,
    SpinnerComponent,
    ErrorDisplayComponent,
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
  ],
})
export class SharedModule {}
