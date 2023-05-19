import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MatCardModule, DashboardRoutingModule],
})
export class DashboardModule {}
