import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercredentialsPage } from './usercredentials.page';

const routes: Routes = [
  {
    path: '',
    component: UsercredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercredentialsPageRoutingModule {}
