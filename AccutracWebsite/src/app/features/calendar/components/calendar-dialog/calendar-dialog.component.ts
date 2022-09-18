import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss']
})
export class CalendarDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {date: string, events: CalendarEvent[]}
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
