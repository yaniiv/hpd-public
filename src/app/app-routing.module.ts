import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatStepper} from '@angular/material';
import { RouterModule, Routes} from '@angular/router';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormComponent} from './form/form.component';
import {LandingComponent} from './landing/landing.component';

const appRoutes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "affidavit",
    component: FormComponent
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
