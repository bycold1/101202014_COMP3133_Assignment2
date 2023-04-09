import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';
import { EmployeeUpdateService } from '../employee-update.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: any;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private graphqlService: GraphqlService,
    private employeeUpdateService: EmployeeUpdateService
  ) {}

  ngOnInit(): void {
    const eid = this.route.snapshot.paramMap.get('eid');
    if (eid) {
      this.graphqlService.getEmployee(eid).subscribe(
        (result: any) => {
          this.employee = result.data.employee;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  updateEmployee(form: NgForm): void {
    const { first_name, last_name, email, gender, salary } = form.value;

    if (!first_name || !last_name || !email || !gender || !salary) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.graphqlService
      .updateEmployee(
        this.employee.eid,
        first_name,
        last_name,
        email,
        gender,
        salary
      )
      .subscribe(
        () => {
          this.employeeUpdateService.employeeUpdated();
          this.router.navigate(['/employee']);
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

  parseFloat(value: string): number {
    return parseFloat(value);
  }

  navigateToEmployee() {
    this.router.navigate(['/employee']);
  }
}
