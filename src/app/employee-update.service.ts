import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUpdateService {
  private employeeUpdatedSource = new Subject<void>();

  employeeUpdated$ = this.employeeUpdatedSource.asObservable();

  employeeUpdated() {
    this.employeeUpdatedSource.next();
  }
}
