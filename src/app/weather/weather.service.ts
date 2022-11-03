import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WeatherObject } from '../weatherObject';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class WeatherService {
  weatherUrl = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('WeatherService');
  }

  /** GET weather by lat and lon from the api */
  getWeather(lat: number, lon: number): Observable<WeatherObject> {
    this.messageService.add('WeatherService : requete météorologique pour la lat = ' + Math.round(lat * 10) / 10 + ' / lon = ' + Math.round(lon * 10) / 10);
    return this.http.get<WeatherObject>(this.weatherUrl + 'lat=' + lat + '&lon=' + lon + '&units=metric&appid=5079d7f18e0ca33095196097cbbf1951')
      .pipe(
        catchError(this.handleError<WeatherObject>('getWeather'))
      );
  }

}