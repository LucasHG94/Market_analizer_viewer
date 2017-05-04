import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent }  from './app.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainSidebarComponent} from './main-sidebar/main-sidebar.component';
import {CommonModule} from "@angular/common";
import {HttpModule, JsonpModule} from "@angular/http";
import {ProxyService} from "./proxy.service";

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    ProxyService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
