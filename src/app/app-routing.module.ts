import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {FormComponent} from './form/form.component';
import {LandingComponent} from './landing/landing.component';
import {FormsListComponent} from './forms-list/forms-list.component';

const appRoutes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "affidavit",
    component: FormComponent
  },
  {
    path: "forms",
    component: FormsListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
