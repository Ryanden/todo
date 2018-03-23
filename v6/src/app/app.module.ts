import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodosFilterPipe } from './todos-filter.pipe';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';
import { TodoNavComponent } from './todos/todo-nav/todo-nav.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';
import { TodoContainerComponent } from './todos/todo-container.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosFilterPipe,
    TodoListComponent,
    TodoFormComponent,
    TodoNavComponent,
    TodoFooterComponent,
    TodoContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
