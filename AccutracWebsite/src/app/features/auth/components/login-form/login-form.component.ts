import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
    companyCode: string;
  }> = new EventEmitter();

  loginForm: UntypedFormGroup;

  companyCodes: string[] = ['HTC', 'TEST'];

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      companyCode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get companyCode() {
    return this.loginForm.get('companyCode');
  }

  onSubmit() {
    this.formData.emit(this.loginForm.value);
  }

}
