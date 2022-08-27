import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadStep2RoutingModule } from './lead-step2-routing.module';
import { LeadStep2Component } from './lead-step2.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [LeadStep2Component],
  imports: [
    CommonModule,
    LeadStep2RoutingModule,
    MatSelectModule,
    MatRadioModule,
    SharedModule
  ]
})
export class LeadStep2Module { }
