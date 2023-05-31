import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TotalizerService } from './services/totalizer.service';
import { TotalizersComponent } from './totalizers.component';
import { TotalizerListPageComponent } from './pages/totalizer-list-page/totalizer-list-page.component';
import { TotalizersRoutingModule } from './totalizers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TotalizerInfoComponent } from './components/totalizer-info/totalizer-info.component';

@NgModule({
  declarations: [TotalizersComponent, TotalizerListPageComponent, TotalizerInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    SharedModule,
    TotalizersRoutingModule,
    FormsModule,
  ],
  providers: [TotalizerService],
  exports: [],
})
export class TotalizerModule {}
