import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LeadCounts } from 'src/app/core/interfaces/lead/lead-counts';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

interface searchType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() sidenavReference: MatSidenav;
  @Output() pathChange = new EventEmitter<string>();

  currentPath: string;

  companyCodes: string[] = ['HTC', 'TEST'];
  currentCompanyCode: string = this.localStorage.get("companyCode");

  leadCounts: LeadCounts;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private data: DataService,
    private media: MediaObserver,
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.data.currentPath.subscribe(path => {
      this.currentPath = path;
      this.pathChange.emit(path);
    });
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['auth/login']);
        this.sidenavReference.close();
      })
      .catch((e) => console.log(e.message));
  }

  changeRoute(route: string) {
    this.router.navigate([route]);

    if (this.media.isActive('xs')) {
      this.sidenavReference.close();
    };
  }

  changeCompanyCode(companyCode: string) {
    this.localStorage.store("companyCode", companyCode);
  }
}
