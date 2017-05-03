import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent }  from './app.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainSidebarComponent} from './main-sidebar/main-sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
