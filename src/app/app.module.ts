import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent }  from './app.component';
import {MainSidebarComponent} from './main-sidebar/main-sidebar.component';
import {CompanyComponent} from './+company/company.component';
import {ChartFundamentalComponent} from './chart-fundamental/chart-fundamental.coponent';
import {ChartCandlestickComponent} from './chart-candlestick/chart-candlestick.component';
import {ChartTechnicalComponent} from './chart-technical/chart-technical.component';
import {CommonModule} from '@angular/common';
import {HttpModule, JsonpModule} from '@angular/http';
import {ProxyService} from './proxy.service';
import {AppRoutingModule} from './app-routing.module';
import {AppConfig} from './model/index';
import {appConfig} from './config/app.config';
import {SummaryComponent} from './+summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MainSidebarComponent,
    CompanyComponent,
    ChartFundamentalComponent,
    ChartCandlestickComponent,
    ChartTechnicalComponent,
    SummaryComponent
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
