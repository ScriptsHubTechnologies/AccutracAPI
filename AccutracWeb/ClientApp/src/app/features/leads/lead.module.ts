import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadComponent } from './lead.component';
import { LeadListPageComponent } from './pages/lead-list-page/lead-list-page.component';
import { LeadListComponent } from './components/lead-list/lead-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [LeadComponent, LeadListPageComponent, LeadListComponent],
  imports: [
    CommonModule,
    LeadRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule
  ]
})
export class LeadModule { }
