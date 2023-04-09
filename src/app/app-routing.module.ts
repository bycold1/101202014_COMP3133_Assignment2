import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'addemployee', component: AddemployeeComponent, canActivate: [AuthGuardService] },
  { path: 'updateemployee/:eid', component: UpdateEmployeeComponent, canActivate: [AuthGuardService] },
  { path: 'viewemployee', component: ViewemployeeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
