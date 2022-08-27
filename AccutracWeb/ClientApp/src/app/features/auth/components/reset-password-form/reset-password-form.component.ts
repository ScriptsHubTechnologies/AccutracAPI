import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { doPasswordsMatch } from 'src/app/shared/validators/password-match-validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control?.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return ((invalidCtrl || invalidParent) && control.touched);
  }
}

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})

export class ResetPasswordFormComponent implements OnInit {

  @Output() formData: EventEmitter<{
    password: string;
    confirmPassword: string;
  }> = new EventEmitter();

  resetPasswordForm: UntypedFormGroup;

  passwordsMatch: boolean = true;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, { validator: doPasswordsMatch });
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.formData.emit(this.resetPasswordForm.value);
    }
  }

}
