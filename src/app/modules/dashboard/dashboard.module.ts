import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardMainComponent } from './pages/dashboard-main/dashboard-main.component';

@NgModule({
  declarations: [DashboardComponent, DashboardMainComponent],
  imports: [CommonModule, MatCardModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
