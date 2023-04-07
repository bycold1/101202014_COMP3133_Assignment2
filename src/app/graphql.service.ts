import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  // Queries
  getEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query GetEmployees {
          employees {
            eid
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
    }).valueChanges.pipe(
      map((result: any) => result.data.employees)
    );
  }
  

  getEmployee(eid: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetEmployee($eid: ID!) {
          employee(eid: $eid) {
            eid
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: { eid }
    }).valueChanges;
  }

  login(email: string, password: string) {
    return this.apollo.query({
      query: gql`
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            _id
            userName
            email
          }
        }
      `,
      variables: { email, password }
    });
  }

  // Mutations
  createUser(userName: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateUser($userName: String!, $email: String!, $password: String!) {
          createUser(userName: $userName, email: $email, password: $password) {
            _id
            userName
            email
          }
        }
      `,
      variables: { userName, email, password }
    });
  }

  addEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number) {
    const ADD_EMPLOYEE = gql`
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
          eid
          first_name
          last_name
          email
          gender
          salary
        }
      }
    `;
  
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        first_name,
        last_name,
        email,
        gender,
        salary
      },
    });
  }
  
  updateEmployee(eid: string, first_name: string, last_name: string, email: string, gender: string, salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee($eid: ID!, $first_name: String, $last_name: String, $email: String, $gender: String, $salary: Float) {
          updateEmployee(eid: $eid, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
            eid
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: { eid, first_name, last_name, email, gender, salary }
    });
  }

  deleteEmployee(eid: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($eid: ID!) {
          deleteEmployee(eid: $eid) {
            eid
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: { eid }
    });
  }
}
