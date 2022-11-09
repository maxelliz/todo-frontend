import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Todo } from '../todo';
import { TodoService } from './todo.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  providers: [ TodoService ],
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  editTodo: Todo | undefined; // the todo currently being edited
  todoDescription = '';
  todoId = 1;
  todoDone = false;
  page: number = 1;
  direction: string = 'asc';
  column: string = 'id';
  type: string = 'number';

  constructor(private todoService: TodoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.editTodo = todo;
    this.todoId = todo.id;
    this.todoDescription = todo.description;
    this.todoDone = todo.done;
    this.messageService.add('TodoComponent : selection de la tache id = ' + this.editTodo?.id);
  }

  setSortParams(param: any) {
    this.direction = param.dir;
    this.column = param.col;
    this.type = param.typ;
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => (this.todos = todos));
  }

  getTodoDone(): void {
    this.page = 1;
    this.todoService.getTodoDone()
      .subscribe(todos => (this.todos = todos));
  }

  getTodoInProgress(): void {
    this.page = 1;
    this.todoService.getTodoInProgress()
      .subscribe(todos => (this.todos = todos));
  }

  getTodoById(id: number): void {
    this.todoService.getTodoById(id)
      .subscribe(todos => (this.todos = todos));
  }

  add(description: string): void {
    this.editTodo = undefined;
    description = description.trim();
    if (!description) {
      return;
    }

    // The server will generate the id for this new hero
    const id: number = this.todos[this.todos.length - 1].id + 1;
    const done: boolean = false;
    const newTodo: Todo = { id, description, done } as Todo;
    this.todoService
      .addTodo(newTodo)
      .subscribe(todo => this.todos.push(todo));
    this.getTodos();
  }

  delete(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todoService
      .deleteTodo(id)
      .subscribe();
  }

  search(searchTerm: string) {
    this.editTodo = undefined;
    if (searchTerm) {
      this.todoService
        .searchTodos(searchTerm)
        .subscribe(todos => (this.todos = todos));
    } else {
      this.getTodos();
    }
  }

  update(todoId: number, todoDescription: string, todoDone: boolean) {
    this.editTodo = this.todos[this.todos.findIndex(t => t.id === todoId)];
    if (todoId && todoDescription && this.editTodo) {
      this.todoService
        .updateTodo({...this.editTodo, id: todoId, description: todoDescription, done: todoDone})
        .subscribe(todo => {
        // replace the todo in the todos list with update from server
        const ix = todo ? this.todos.findIndex(t => t.id === todo.id) : -1;
        if (ix > -1) {
          this.todos[ix] = todo;
        }
      });
      this.editTodo = undefined;
      this.getTodos();
    }
  }

}
