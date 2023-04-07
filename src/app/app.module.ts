import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddemployeeComponent,
    ViewemployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ApolloModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'https://apollo-server-app.herokuapp.com/' })
        };
      },
      deps: [HttpLink]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
