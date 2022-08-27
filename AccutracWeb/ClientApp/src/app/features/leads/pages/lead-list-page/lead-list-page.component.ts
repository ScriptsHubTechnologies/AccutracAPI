import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Lead } from 'src/app/core/interfaces/lead/lead';
import { LeadCounts } from 'src/app/core/interfaces/lead/lead-counts';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-lead-list-page',
  templateUrl: './lead-list-page.component.html',
  styleUrls: ['./lead-list-page.component.scss']
})
export class LeadListPageComponent implements OnInit {

  statusMessage: string = '';
  statusCode: number;
  count: number;

  leadCounts: LeadCounts;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getCounts().subscribe({
      next: (counts) => {
        this.leadCounts = counts;

        this.route.paramMap.subscribe((params) => {
          let status = params.get('status') as string;
          switch (status) {
            case 'pending':
              this.statusCode = 0;
              this.statusMessage = 'Pending leads to schedule';
              this.count = this.leadCounts?.pending as number;
              break;
            case 'unscheduled':
              this.statusCode = 1;
              this.statusMessage = 'Unscheduled Leads';
            this.count = this.leadCounts?.unscheduled as number;
              break;
            case 'reschedule':
              this.statusCode = 2;
              this.statusMessage = 'Leads to reschedule';
              this.count = this.leadCounts?.reshedule as number;
              break;
            case 'approved-dead':
              this.statusCode = 3;
              this.statusMessage = 'Approved dead leads';
              this.count = this.leadCounts?.approvedDeadLead as number;
              break;
          }
        })
      }
    });
  }

  getCounts(): Observable<LeadCounts> {
    return this.apiService.getLeadCounts();
  }

}
