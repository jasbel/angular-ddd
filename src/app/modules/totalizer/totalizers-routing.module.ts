import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotalizersComponent } from './totalizers.component';
import { TotalizerListPageComponent } from './pages/totalizer-list-page/totalizer-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: TotalizersComponent,
    children: [
      {
        path: '',
        component: TotalizerListPageComponent,
      },
      {
        path: 'list',
        component: TotalizerListPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalizersRoutingModule {}
