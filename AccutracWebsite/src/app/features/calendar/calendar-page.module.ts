import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarPageRoutingModule } from './calendar-page-routing.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { CalendarDialogComponent } from './components/calendar-dialog/calendar-dialog.component';
import { CalendarAppointmentComponent } from './components/calendar-appointment/calendar-appointment.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarPageComponent,
    CalendarDialogComponent,
    CalendarAppointmentComponent
  ],
  imports: [
    CommonModule,
    CalendarPageRoutingModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonToggleModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class CalendarPageModule { }
