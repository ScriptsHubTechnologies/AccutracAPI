import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.scss']
})
export class EmailPageComponent implements OnInit {

  message: string;

  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private afAuth: AngularFireAuth,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  sendPasswordResetEmail() {
    if (this.resetPasswordForm.valid) {
      this.afAuth.sendPasswordResetEmail(this.resetPasswordForm.get('email')?.value).then(
        () => {
          this.openSnackBar("Password reset email sent!", "Dismiss");
        },
        error => {
          console.error(error);
        }
      )
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { 
      duration: 3000,
      verticalPosition: 'top'
     });
  }
}
