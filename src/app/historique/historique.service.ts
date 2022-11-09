import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { History } from '../history';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class HistoriqueService {
  historiqueUrl = 'history/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('HistoriqueService');
  }

  /** GET history from the server */
  getHistory(): Observable<History[]> {
    this.messageService.add('HistoryService : liste de toute l\'historique des taches.');
    return this.http.get<History[]>(this.historiqueUrl + 'all')
      .pipe(
        catchError(this.handleError('getHistory', []))
      );
  }

}