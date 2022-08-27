import { Component, QueryList, ViewChildren } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DataService } from './core/services/data/data.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren('sidenav') sidenavRef: QueryList<MatSidenav>;

  title: string = 'Helitrack-New';

  public sidenav: MatSidenav;
  public activePath: string;

  isAuthenticated: boolean = true;

  constructor(
    public router: Router,
    private data: DataService,
    public media: MediaObserver,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.currentAuthStatus.subscribe(authStatus => {
      authStatus ? this.isAuthenticated = true : this.isAuthenticated = false;
    });
    this.sidenav = this.sidenavRef?.first;

    if (this.media.isActive('xs') && this.sidenav) {
      this.sidenav.opened = false;
    } else if (this.sidenav) {
      this.sidenav.opened = true;
    }
  }

  ngAfterViewInit() {
    // Get the sidenav reference
    if (this.sidenav) {
      this.sidenav.opened = false;
    }
  }

  // // Send the current mode to the data service
  // updateMode() {
  //   this.data.changeMode(this.sidenav.mode);
  // }

  getPath(path: string) {
    this.activePath = path;
  }

}
