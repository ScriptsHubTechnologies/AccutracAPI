import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseErrorHandler } from 'src/app/shared/handlers/firebase-handler';

@Component({
  selector: 'app-recover-page',
  templateUrl: './recover-page.component.html',
  styleUrls: ['./recover-page.component.scss']
})
export class RecoverPageComponent implements OnInit {

  component: string;
  oobCode: string;
  successMessage: string;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    activatedRoute.data.subscribe({
      next: (data) => {
        this.component = data?.['component'];
      }
    })
    activatedRoute.queryParams.subscribe({
      next: (params) => {
        if (!params['oobCode'] && this.router.url == '/auth/reset-password') {
          this.router.navigate(['/login']);
        } else {
          this.oobCode = params['oobCode'];
        }
      }
    })
  }

  ngOnInit(): void {
  }

  sendResetPasswordEmail(userEmail: { email: string }) {
    this.afAuth.sendPasswordResetEmail(userEmail.email).then(
      () => {
        this.successMessage = `Password reset email sent to ${userEmail.email}`;
      }
    ).catch(error => {
      this.errorMessage = FirebaseErrorHandler.Parse(error.code);
    })
  }

  resetPassword(newPassword: { password: string, confirmPassword: string }) {
    this.afAuth.confirmPasswordReset(this.oobCode, newPassword.password).then(
      () => {
        this.successMessage = `Password successfully changed`
      }
    ).catch(error => {
      this.errorMessage = FirebaseErrorHandler.Parse(error.code);
    })
  }

}
