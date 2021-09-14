import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule, MatSelectModule,MatStepperModule, MatIconModule, MatButtonToggleModule, MatButtonModule, MatInputModule, MatFormFieldModule} from '@angular/material';

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
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [
    FormComponent,
  ]
})
export class FormModule { }
