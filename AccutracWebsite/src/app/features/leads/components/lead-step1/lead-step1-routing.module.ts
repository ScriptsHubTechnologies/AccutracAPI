import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadStep1Component } from './lead-step1.component';

const routes: Routes = [{ path: '', component: LeadStep1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadStep1RoutingModule { }
