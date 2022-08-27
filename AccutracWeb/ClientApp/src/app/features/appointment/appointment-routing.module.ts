import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';

const routes: Routes = [
  { path: '', component: AppointmentPageComponent},
  { path: 'scheduling', component: AppointmentPageComponent, data: { component: "smart"} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
