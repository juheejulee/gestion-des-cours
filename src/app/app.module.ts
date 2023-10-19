import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursComponent } from './cours/cours.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { OopsComponent } from './oops/oops.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursDetailsComponent } from './cours-details/cours-details.component';
//import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    CoursComponent,
    EtudiantsComponent,
    LoginComponent,
    MessageComponent,
    OopsComponent,
    CoursDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
