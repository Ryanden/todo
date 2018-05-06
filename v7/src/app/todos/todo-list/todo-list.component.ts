import { Component, Input } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'todo-list',
  template: `
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let todo of todoService.todos | todosFilter: selectedItem">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" (click)="todoService.removeTodo(todo.id)"></span>
          </a>
          <label class="i-checks" [for]="todo.id">
            <input type="checkbox" [id]="todo.id" [checked]="todo.completed" (change)="todoService.toggleCompletedTodo(todo.id)">
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
  @Input() selectedItem: string[];

  constructor(public todoService: TodoService) { }
}
