import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { AboutComponent } from './about/about.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AboutComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
