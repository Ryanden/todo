import { Component } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'todo-form',
  template: `
    <input class="form-control input-lg" 
    placeholder="What needs to be done?" 
    autofocus 
    (keyup.enter)="onEnter($event.target.value)" [(ngModel)]="content">
  `,
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  content: string;

  constructor(private todoService: TodoService) {}

  onEnter(content: string) {
    if (!content) return;
    this.todoService.addTodo(content);
    this.content = '';
  }
}
