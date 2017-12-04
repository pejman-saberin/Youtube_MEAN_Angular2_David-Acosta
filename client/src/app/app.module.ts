import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent  //this is generated automatically using ng generate component navbar  .
   ],
  imports: [
    BrowserModule,
    AppRoutingModule  //if you just create a module you just add it here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
