import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';
import { Observable } from 'rxjs';
import { EmployeeUpdateService } from '../employee-update.service'; // Import EmployeeUpdateService
import { ViewemployeeComponent } from '../viewemployee/viewemployee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeList$!: Observable<any>;
  updatingEmployee: boolean = false;

  constructor(private router: Router, private graphqlService: GraphqlService, private employeeUpdateService: EmployeeUpdateService) {
    // Listen for updates
    this.employeeUpdateService.employeeUpdated$.subscribe(() => {
      this.loadEmployeeList();
    });
  }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.employeeList$ = this.getEmployees();
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
      this.loadEmployeeList(); 
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
