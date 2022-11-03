import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
import { CommonModule } from '@angular/common';

import { RequestCache, RequestCacheWithMap } from './request-cache.service';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';

import { SortPipe } from './todo/sort';
import { SortParamsDirective } from './todo/sort.params';

import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    WeatherComponent,
    MessagesComponent,
    PackageSearchComponent,
    SortPipe,
    SortParamsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularWeatherWidgetModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
