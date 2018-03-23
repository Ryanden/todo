import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {
  navItems = ['all', 'active', 'completed'];
  selectedItem: string;
  url = environment.url;

  todos: Todo[] = [];

  constructor(public http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(this.url)
      .subscribe(todos => this.todos = todos);
  }

  ngOnInit() {
    this.getTodos();
    this.selectedItem = this.navItems[0];
  }

  completedTodo(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  activeTodo(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  generatorId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  addTodo(content: string) {
    const newTodo = { id: this.generatorId(), content, completed: false };
    this.http.post(this.url, newTodo)
      .subscribe(() => this.todos = [newTodo, ...this.todos]);
  }

  removeTodo(id: number) {
    this.http.delete(`${this.url}/id/${id}`, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  toggleCompletedTodo(id: number) {
    const { completed } = this.todos.find(todo => todo.id === id);
    this.http.patch(`${this.url}/id/${id}`, { completed: !completed }, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  toggleCompletedAll(state: string) {
    this.http.patch(`${this.url}`, { completed: state }, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }

  clearCompletedTodo() {
    this.http.delete(`${this.url}/completed`, { responseType: 'text' })
      .subscribe(() => this.getTodos());
  }
}
