import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Estimator } from 'src/app/core/interfaces/calendar/estimator';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss']
})
export class CalendarSelectComponent implements OnInit {

  zones: string[] = ['Illinois Metro', 'Helitech', 'St Louis'];
  selectedZone: string;

  estimators: Estimator[] = []
  selectedEstimator: string;

  constructor(
    private data: DataService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getEstimators().subscribe(estimators => {
      this.estimators = estimators;
    });
  }

  selectEstimator(event: MatSelectChange) {
    this.data.changeEstimator(event.value);
  }

  // ngOnDestroy(): void {
  //   this.data.changeEstimator({ username: '', userid: '' });
  // }


}
