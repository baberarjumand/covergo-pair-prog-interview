import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { InputFormComponent } from './input-form/input-form.component';
import { SampleComp01Component } from './sample-comp01/sample-comp01.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'form',
    component: InputFormComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
