import { Component } from '@angular/core';
import { Todo } from '../todo.interface';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {
  navItems = ['all', 'active', 'completed'];
  selectedItem = this.navItems[0];

  todos: Todo[] = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Angular', completed: true }
  ];

  completedTodo(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  activeTodo(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  generatorId(): number {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(content: string) {
    const newTodo = { id: this.generatorId(), content, completed: false };
    this.todos = [newTodo, ...this.todos];
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleCompletedTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id === id ? Object.assign({}, todo, { completed: !todo.completed }) : todo);
  }

  toggleCompletedAll(state: string) {
    this.todos = this.todos.map(todo => Object.assign({}, todo, { completed: state }));
  }

  clearCompletedTodo(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
}
