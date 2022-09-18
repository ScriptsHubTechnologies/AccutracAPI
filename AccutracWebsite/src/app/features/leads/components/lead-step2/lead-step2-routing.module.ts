import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadStep2Component } from './lead-step2.component';

const routes: Routes = [{ path: '', component: LeadStep2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadStep2RoutingModule { }
