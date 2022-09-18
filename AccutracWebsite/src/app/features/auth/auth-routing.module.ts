import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailPageComponent } from './pages/email-page/email-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RecoverPageComponent } from './pages/recover-page/recover-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: RecoverPageComponent, data: { component: "forgot" } },
  { path: 'reset-password', component: RecoverPageComponent, data: { component: "reset" } },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
