import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.scss']
})
export class AppointmentPageComponent implements OnInit {

  component: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    activatedRoute.data.subscribe({
      next: (data) => {
        if (data?.['component']) {
          this.component = data?.['component'];
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    })
   }

  ngOnInit(): void {}

}
