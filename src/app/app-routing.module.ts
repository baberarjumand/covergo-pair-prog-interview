import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComp01Component } from './sample-comp01/sample-comp01.component';

const routes: Routes = [
  {
    path: 'comp01',
    component: SampleComp01Component,
  },
  {
    path: '**',
    redirectTo: 'comp01',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
