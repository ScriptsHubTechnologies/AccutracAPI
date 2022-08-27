import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estimator } from 'src/app/core/interfaces/calendar/estimator';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {

  currentEstimator: Estimator;

  noUserMessage: string = "Select a user to view their calendar";

  estimatorSubscription: Subscription;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.estimatorSubscription = this.data.currentEstimator.subscribe(estimatorData => {
      this.currentEstimator = estimatorData
    });
  }

  ngOnDestroy() {
    this.estimatorSubscription.unsubscribe();
  }

}
