import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { SmartSchedulerComponent } from './components/smart-scheduler/smart-scheduler.component';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SmartSchedulerComponent,
    AppointmentPageComponent,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class AppointmentModule { }
