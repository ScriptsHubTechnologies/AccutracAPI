import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormModule } from './components/login-form/login-form.module';
import { EmailPageComponent } from './pages/email-page/email-page.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { RecoverPageComponent } from './pages/recover-page/recover-page.component';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    EmailPageComponent,
    ResetPasswordFormComponent,
    RecoverPageComponent,
    ForgotPasswordFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    LoginFormModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class AuthModule { }
