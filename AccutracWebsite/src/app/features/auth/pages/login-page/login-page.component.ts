import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/interfaces/auth/login-data';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { FirebaseErrorHandler } from 'src/app/shared/handlers/firebase-handler';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  showLogin: boolean = false;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.authService.checkForExpiredToken();
    console.log(this.localStorage.get('uid'));
    if (this.localStorage.get('uid')) {
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
  }

  login(loginData: LoginData) {
    this.authService.login(loginData)
      .then(() => {
        this.localStorage.store("companyCode", loginData.companyCode);
        this.router.navigate(['/dashboard'])
      }
      ).catch(error => {
        this.errorMessage = FirebaseErrorHandler.Parse(error.code);
      })
    //this.router.navigate(['/dashboard'])
  }

}
