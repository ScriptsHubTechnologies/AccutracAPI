import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadComponent } from './lead.component';
import { LeadListPageComponent } from './pages/lead-list-page/lead-list-page.component';

const routes: Routes = [
  { path: '', component: LeadComponent, children: [
    { path: 'step1', loadChildren: () => import('./components/lead-step1/lead-step1.module').then(m => m.LeadStep1Module)},
    { path: 'step2', loadChildren: () => import('./components/lead-step2/lead-step2.module').then(m => m.LeadStep2Module)},
  ]},
  { path: 'list/:status', component: LeadListPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
