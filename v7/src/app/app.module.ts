import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { TodosModule } from './todos/todos.module';
import { SigninModule } from './signin/signin.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    TodosModule,
    SigninModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
