import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule ,     // import HttpClientModule after BrowserModule.
    HttpClientModule],
  declarations: [ AppComponent, DashboardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
