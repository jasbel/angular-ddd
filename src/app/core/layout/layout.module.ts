import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AsideMenuComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutMainComponent
  ],
  imports: [CommonModule, LayoutRoutingModule, ReactiveFormsModule],
})
export class LayoutModule {}
