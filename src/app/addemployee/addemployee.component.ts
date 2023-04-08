import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';
import { EmployeeUpdateService } from '../employee-update.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent {
  errorMessage: string | null = null;

  constructor(private router: Router, private graphqlService: GraphqlService, private employeeUpdateService: EmployeeUpdateService) { }

  addEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number): void {
    if (!first_name || !last_name || !email || !gender || !salary) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.graphqlService.addEmployee(first_name, last_name, email, gender, salary).subscribe(() => {
      this.employeeUpdateService.employeeUpdated(); 
      this.router.navigate(['/employee']);
    }, (error) => {
      this.errorMessage = error.message;
    });
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }
  navigateToEmployee() {
    this.router.navigate(['/employee']);
  }
}
