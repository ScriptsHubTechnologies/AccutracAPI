import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/core/interfaces/misc/menu-item';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean;

  @Input() sidenavReference2: MatSidenav;

  menuItems: MenuItem[] = [
    {
      label: 'Account Settings',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false,
      route: 'dashboard'
    },
    {
      label: 'Appointment',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: 'dashboard'
    },
    {
      label: 'Sales',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: 'dashboard'
    },
    {
      label: 'Production',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route: 'dashboard'
    },
    {
      label: 'Calendar',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      route: 'calendar'
    },
    {
      label: 'Admin',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      requiresAdmin: true,
      route: 'admin/users'
    }
  ]

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentAuthStatus.subscribe(authStatus => {
      authStatus ? this.isAuthenticated = true : this.isAuthenticated = false
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard'])
  }

}
