import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-nav',
  template: `
    <ul class="nav nav-xs nav-pills">
      <li *ngFor="let item of navItems" [class.active]="item===selectedItem">
        <a (click)="changeNavItem.emit(item)">{{ item }}</a>
      </li>
    </ul>
  `,
  styleUrls: ['./todo-nav.component.css']
})
export class TodoNavComponent {
  @Input() navItems: string[];
  @Input() selectedItem: string;
  @Output() changeNavItem = new EventEmitter<string>();
}
