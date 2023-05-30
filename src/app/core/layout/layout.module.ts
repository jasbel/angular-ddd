import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutMainComponent } from './components/layout-main/layout-main.component';
import { LayoutComponent } from './layout.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../routing';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];
@NgModule({
  declarations: [
    LayoutComponent,
    AsideMenuComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    LayoutMainComponent,
    ToolbarComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatTreeModule,
    MatToolbarModule,
    MatMenuModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LayoutModule {}
