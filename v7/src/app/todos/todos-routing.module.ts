import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoContainerComponent } from './todo-container.component';

const routes: Routes = [
  { path: 'todos', component: TodoContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
