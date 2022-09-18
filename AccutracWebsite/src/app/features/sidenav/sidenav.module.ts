import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { LeadCountsComponent } from './components/lead-counts/lead-counts.component';
import { CalendarSelectComponent } from './components/calendar-select/calendar-select.component';



@NgModule({
  declarations: [SidenavComponent, LeadCountsComponent, CalendarSelectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
