import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
import { CommonModule } from '@angular/common';

import { RequestCache, RequestCacheWithMap } from './request-cache.service';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { TodoComponent } from './todo/todo.component';
import { HistoriqueComponent } from './historique/historique.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';

import { SortTodoPipe } from './todo/sort';
import { SortTodoParamsDirective } from './todo/sort.params';
import { SortHistoryPipe } from './historique/sort';
import { SortHistoryParamsDirective } from './historique/sort.params';

import { httpInterceptorProviders } from './http-interceptors/index';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HistoriqueComponent,
    WeatherComponent,
    MessagesComponent,
    PackageSearchComponent,
    SortTodoPipe,
    SortTodoParamsDirective,
    SortHistoryPipe,
    SortHistoryParamsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularWeatherWidgetModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    AppRoutingModule
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
