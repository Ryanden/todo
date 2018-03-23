import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() addTodo = new EventEmitter<string>();

  onEnter(content: string) {
    if (!content) return;
    this.addTodo.emit(content);
    this.content = '';
  }
}
