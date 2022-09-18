import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }
