import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-footer',
  template: `
    <div class="col-xs-6">
      <label class="i-checks" style="padding-left: 20px">
        <input type="checkbox" (change)="toggleCompletedAll.emit($event.target.checked)">
        <i></i>
        <span>Mark all as complete</span>
      </label>
    </div>
    <div class="col-xs-6 text-right">
      <button class="btn btn-default btn-xs" (click)="clearCompletedTodo.emit()">Clear completed (
      <span>{{ completedTodo }}</span>)</button>
      <strong>{{ activeTodo }}</strong> item<ng-container *ngIf="activeTodo>1">s</ng-container> left
    </div>
  `,
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {
  @Input() completedTodo: number;
  @Input() activeTodo: number;
  @Output() clearCompletedTodo = new EventEmitter<number>();
  @Output() toggleCompletedAll = new EventEmitter<number>();
}
