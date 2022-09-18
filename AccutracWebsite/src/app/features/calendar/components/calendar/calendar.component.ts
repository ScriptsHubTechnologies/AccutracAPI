import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { map, Observable, Subscription } from 'rxjs';
import { Estimator } from 'src/app/core/interfaces/calendar/estimator';
import { SalesCalendarEvent } from 'src/app/core/interfaces/calendar/sales-calendar-data';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  isLoading: boolean = true;

  salesEventData: SalesCalendarEvent[];

  events$: Observable<CalendarEvent<{ salesEvent: SalesCalendarEvent }>[]>;
  events: CalendarEvent<{ event: SalesCalendarEvent }>[];

  estimatorSubscription: Subscription;
  selectedEstimator: Estimator;

  eventColor = {
    primary: "#4BB543",
    secondary: "#f0f2f5"
  }

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    public media: MediaObserver,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.estimatorSubscription = this.data.currentEstimator.subscribe(estimatorData => {
      this.selectedEstimator = estimatorData;
      this.fetchData();
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  fetchData() {
    let userId = this.selectedEstimator.userid;
    let date = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');

    this.events$ = this.apiService.getSalesCalendar(userId, date).pipe(
      map((results: SalesCalendarEvent[]) => {
        return results.map((salesEvent) => {

          let event: CalendarEvent<{ salesEvent: SalesCalendarEvent }> = {
            title: `Appt # ${salesEvent.appointmentId}`,
            start: new Date(`${salesEvent.date} ${salesEvent.startTime}`),
            end: new Date(`${salesEvent.date} ${salesEvent.endTime}`),
            color: this.eventColor,
            cssClass: "sales-event",
            meta: {
              salesEvent,
            }
          }
          return event;
        })
      })
    )
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events);
    let dialogData = {
      data: {
        date: date,
        events: events
      }
    }
    const dialogRef = this.dialog.open(CalendarDialogComponent, dialogData);
  }

  ngOnDestroy() {
    this.estimatorSubscription.unsubscribe();
  }

}