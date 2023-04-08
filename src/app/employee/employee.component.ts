import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';
import { Observable } from 'rxjs';
import { EmployeeUpdateService } from '../employee-update.service'; // Import EmployeeUpdateService
import { ViewemployeeComponent } from '../viewemployee/viewemployee.component';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList$!: Observable<any>;
  updatingEmployee: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private graphqlService: GraphqlService, private employeeUpdateService: EmployeeUpdateService) {
    this.employeeUpdateService.employeeUpdated$.subscribe(() => {
      this.loadEmployeeList();
    });
  }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

 loadEmployeeList() {
  this.loading = true;
  this.employeeList$ = this.getEmployees().pipe(
    finalize(() => this.loading = false)
  );
}

  getEmployees() {
    return this.graphqlService.getEmployees();
  }
  viewEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.router.navigate(['/viewemployee'], { state: { employee } });
  }
  navigateToAddEmployee() {
    this.router.navigate(['/addemployee']);
  }

  signOut() {
    this.router.navigate(['/login']);
  }

  deleteEmployee(employeeEid: string): void {
    this.graphqlService.deleteEmployee(employeeEid).subscribe(() => {
      this.employeeUpdateService.employeeUpdated(); 
    }, (error) => {
      console.error('Error:', error);
    });
  }

  navigateToUpdateEmployee(employeeEid: string){
    this.router.navigate(['/updateemployee', employeeEid]);
  }

  onEmployeeUpdated(): void {
    this.loadEmployeeList();
    this.updatingEmployee = false;
  }
  selectedEmployee: any = null;
}
