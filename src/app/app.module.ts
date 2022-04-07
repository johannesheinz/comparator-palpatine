import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { InputComponent } from './input/input.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [AppComponent, TableComponent, AboutComponent, InputComponent],
  imports: [BrowserModule, GraphQLModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
