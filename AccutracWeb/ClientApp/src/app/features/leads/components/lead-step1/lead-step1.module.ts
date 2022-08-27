import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadStep1RoutingModule } from './lead-step1-routing.module';
import { LeadStep1Component } from './lead-step1.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [LeadStep1Component],
  imports: [
    CommonModule,
    LeadStep1RoutingModule,
    MatTabsModule,
    MatOptionModule,
    MatCheckboxModule,
    Ng2SearchPipeModule,
    SharedModule,
    MatSelectModule,
    GooglePlaceModule
  ]
})
export class LeadStep1Module { }
