import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';
import { EmployeeUpdateService } from '../employee-update.service'; // Import EmployeeUpdateService

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: any;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graphqlService: GraphqlService,
    private employeeUpdateService: EmployeeUpdateService // Inject EmployeeUpdateService
  ) { }

  ngOnInit(): void {
    const eid = this.route.snapshot.paramMap.get('eid');
    if (eid) {
      this.graphqlService.getEmployee(eid).subscribe((result: any) => {
        this.employee = result.data.employee;
      }, (error) => {
        this.errorMessage = error.message;
      });
    }
  }

  updateEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number): void {
    this.graphqlService.updateEmployee(this.employee.eid, first_name, last_name, email, gender, salary).subscribe(() => {
      this.employeeUpdateService.employeeUpdated(); // Notify EmployeeUpdateService that the employee was updated
      this.router.navigate(['/employee']);
    }, (error) => {
      this.errorMessage = error.message;
    });
  }

  navigateToEmployee() {
    this.router.navigate(['/employee']);
  }
}
