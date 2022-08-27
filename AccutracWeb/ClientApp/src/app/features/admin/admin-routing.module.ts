import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: 'users', component: AdminPageComponent },
  { path: 'users/new', component: NewUserPageComponent },
  { path: 'users/:id', component: UserProfilePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
