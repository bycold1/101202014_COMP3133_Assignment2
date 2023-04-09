import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../shared/auth-styles.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private graphqlService: GraphqlService, private router: Router) {}

  onLogin(email: string, password: string) {
    this.graphqlService.login(email, password).subscribe(({ data }: any) => {
      if (data.login) {
        localStorage.setItem('token', data.login.token); 
        this.router.navigate(['/employee']);
      } else {
        this.errorMessage = 'Login failed';
      }
    }, (error) => {
        this.errorMessage = error.message;
    });
  }
}
