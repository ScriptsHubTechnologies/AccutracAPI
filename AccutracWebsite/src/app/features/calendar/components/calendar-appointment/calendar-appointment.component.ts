import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar-appointment',
  templateUrl: './calendar-appointment.component.html',
  styleUrls: ['./calendar-appointment.component.scss']
})
export class CalendarAppointmentComponent implements OnInit {

  event: CalendarEvent;

  @Input()
  set eventCheck(input: CalendarEvent) {
    console.log(input);
    this.event = input;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
