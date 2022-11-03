import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Todo } from '../todo';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class TodoService {
  todoUrl = 'todo/';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('TodoService');
  }

  /** GET todos from the server */
  getTodos(): Observable<Todo[]> {
    this.messageService.add('TodoService : liste de toutes les taches.');
    return this.http.get<Todo[]>(this.todoUrl + 'all')
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  /** GET todos done from the server */
  getTodoDone(): Observable<Todo[]> {
    this.messageService.add('TodoService : liste de toutes les taches realisees.');
    return this.http.get<Todo[]>(this.todoUrl + 'done')
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  /** GET todos done from the server */
  getTodoInProgress(): Observable<Todo[]> {
    this.messageService.add('TodoService : liste de toutes les taches en cours.');
    return this.http.get<Todo[]>(this.todoUrl + 'inProgress')
      .pipe(
        catchError(this.handleError('getTodos', []))
      );
  }

  /** GET todo by id from the server */
  getTodoById(id: number): Observable<Todo[]> {
    this.messageService.add('TodoService : tache selectionnee id = ' + id);
    return this.http.get<Todo[]>(this.todoUrl + 'byId?id=' + id)
      .pipe(
        catchError(this.handleError('getTodoById', []))
      );
  }

  /* GET todo whose keyword contains search term */
  searchTodos(term: string): Observable<Todo[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('keyword', term) } : {};

    this.messageService.add('TodoService : liste de toutes les taches contenant le mot ' + term);
    return this.http.get<Todo[]>(this.todoUrl + 'search', options).pipe(
        catchError(this.handleError<Todo[]>('searchTodos', [])) // then handle the error
      );
  }

  /** POST: add a new todo to the database */
  addTodo(todo: Todo): Observable<Todo> {
    this.messageService.add('TodoService : ajout d\'une nouvelle tache');
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions)
      .pipe(
        catchError(this.handleError('addTodo', todo))
      );
  }

  /** DELETE: delete the todo from the server */
  deleteTodo(id: number): Observable<unknown> {
    this.messageService.add('TodoService : suppression de la tache id = ' + id);
    return this.http.delete<Todo>(this.todoUrl + '?id=' + id, httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('deleteTodo'))
      );
  }

  /** PUT: update the todo on the server. Returns the updated todo upon success. */
  updateTodo(todo: Todo): Observable<Todo> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    this.messageService.add('TodoService : mise a jour de la tache id = ' + todo.id);
    return this.http.put<Todo>(this.todoUrl, todo, httpOptions)
      .pipe(
        catchError(this.handleError('updateTodo', todo))
      );
  }

}