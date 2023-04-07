import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {
  employee: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state ? navigation.extras.state['employee'] : undefined;
  }

  ngOnInit(): void {
    if (!this.employee) {
      this.router.navigate(['/employee']);
    }
  }
  navigateToEmployee() {
    this.router.navigate(['/employee']);
  }
}
