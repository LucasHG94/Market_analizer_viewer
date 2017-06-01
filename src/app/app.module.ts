import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent }  from './app.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {MainSidebarComponent} from './main-sidebar/main-sidebar.component';
import {CompanyComponent} from './+company/company.component';
import {CommonModule} from '@angular/common';
import {HttpModule, JsonpModule} from '@angular/http';
import {ProxyService} from './proxy.service';
import {AppRoutingModule} from './app-routing.module';
import {AppConfig} from './model/index';
import {appConfig} from './config/app.config';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'AppConfig', useValue: AppConfig.fromRaw(appConfig)},
    ProxyService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
