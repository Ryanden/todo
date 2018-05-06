import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../../todo.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class TodoService {
  todos: Todo[];
  url = environment.url;

  constructor(private http: HttpClient) {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  addTodo(content: string) {
    const newTodo = { id: this.generatorId(), content, completed: false };
    this.http.post(this.url, newTodo)
      .subscribe(() => this.todos = [newTodo, ...this.todos]);
  }

  removeTodo(id: number) {
    this.http.delete(`${this.url}/id/${id}`, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.filter(todo => id !== todo.id));
  }

  toggleCompletedTodo(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id);
    this.http.patch(`${this.url}/id/${id}`, { completed: !completed }, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.map(todo => id === todo.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
  }

  completedTodo(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  activeTodo(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  toggleCompletedAll(state: string) {
    this.http.patch(`${this.url}`, { completed: state }, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.map(todo => Object.assign({}, todo, { completed: state })));
  }

  clearCompletedTodo() {
    this.http.delete(`${this.url}/completed`, { responseType: 'text' })
      .subscribe(() => this.todos = this.todos.filter(todo => !todo.completed));
  }

  private generatorId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }
}
