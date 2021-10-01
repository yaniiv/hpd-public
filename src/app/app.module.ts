import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatOptionModule, MatRadioModule, MatSelectModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule,
} from '@angular/material';
import { RouterModule} from '@angular/router';
import { NgxSignaturepadModule } from 'ngx-signaturepad2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormComponent} from './form/form.component';
import {LandingComponent} from './landing/landing.component';
import {TelInput} from "./library/phone/phone-input.component"
import {SSNInput} from "./library/ssn/ssn-input.component"


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LandingComponent,
    TelInput,
    SSNInput
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
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
    MatRadioModule,
    MatDividerModule,
    AppRoutingModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSignaturepadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
