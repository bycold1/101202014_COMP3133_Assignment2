import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../shared/auth-styles.css']
})
export class SignupComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private graphqlService: GraphqlService, private router: Router) {}

  onSignup(userName: string, email: string, password: string) {
    this.graphqlService.createUser(userName, email, password).subscribe(
      ({ data }: any) => {
        if (data.createUser) {
          this.successMessage = 'User created successfully';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Signup failed';
        }
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  // Add this method
  onCancel() {
    this.router.navigate(['/login']);
  }
}
