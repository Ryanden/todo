import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodosRoutingModule } from './todos-routing.module';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoNavComponent } from './todo-nav/todo-nav.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoContainerComponent } from './todo-container.component';
import { TodosFilterPipe } from '../todos-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TodosRoutingModule
  ],
  declarations: [
    TodoContainerComponent,
    TodosFilterPipe,
    TodoListComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoFooterComponent
  ],
  exports: [
    TodoContainerComponent
  ]
})
export class TodosModule { }
