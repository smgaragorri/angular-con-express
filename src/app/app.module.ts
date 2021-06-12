import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from "@angular/common/http";
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { PersonsComponent } from './persons/persons.component';
import { PersonComponent } from './persons/person/person.component';

@NgModule({
  declarations: [AppComponent, PersonsComponent, PersonComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
