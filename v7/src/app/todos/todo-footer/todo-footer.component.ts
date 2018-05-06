import { Component } from '@angular/core';
import { TodoService } from '../../core/services/todo-service';

@Component({
  selector: 'todo-footer',
  template: `
    <div class="col-xs-6">
      <label class="i-checks" style="padding-left: 20px">
        <input type="checkbox" (change)="todoService.toggleCompletedAll($event.target.checked)">
        <i></i>
        <span>Mark all as complete</span>
      </label>
    </div>
    <div class="col-xs-6 text-right">
      <button class="btn btn-default btn-xs" (click)="todoService.clearCompletedTodo()">Clear completed (
      <span>{{ todoService.completedTodo() }}</span>)</button>
      <strong>{{ todoService.activeTodo() }}</strong> item<ng-container *ngIf="todoService.activeTodo()>1">s</ng-container> left
    </div>
  `,
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {
  constructor(public todoService: TodoService) { }
}
