import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule, MatInputModule, MatFormFieldModule} from '@angular/material';

import { FormComponent } from './form.component';


@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    FormComponent,
  ]
})
export class FormModule { }
