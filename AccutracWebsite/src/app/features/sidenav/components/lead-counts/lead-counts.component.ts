import { Component, OnInit } from '@angular/core';
import { LeadCounts } from 'src/app/core/interfaces/lead/lead-counts';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-lead-counts',
  templateUrl: './lead-counts.component.html',
  styleUrls: ['./lead-counts.component.scss']
})
export class LeadCountsComponent implements OnInit {

  leadCounts: LeadCounts;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getCounts();

    this.localStorage.changes.subscribe(data => {
      if (data.key == 'companyCode') {
        this.getCounts();
      }
    })
  }

  getCounts() {
    this.apiService.getLeadCounts().subscribe({
      next: (response) => {
        this.leadCounts = response;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}
