import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'todo-list',
  template: `
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let todo of todos | todosFilter: selectedItem">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" (click)="remove.emit(todo.id)"></span>
          </a>
          <label class="i-checks" [for]="todo.id">
            <input type="checkbox" [id]="todo.id" [checked]="todo.completed" (change)="toggle.emit(todo.id)">
            <i></i>
            <span>{{ todo.content }}</span>
          </label>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Input() selectedItem: string[];
  @Output() remove = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
}
