import { Component, OnInit } from '@angular/core';

import { TodoService } from '../core/services/todo-service';

@Component({
  selector: 'todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {
  navItems = ['all', 'active', 'completed'];
  selectedItem: string;

  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.selectedItem = this.navItems[0];
  }
}
