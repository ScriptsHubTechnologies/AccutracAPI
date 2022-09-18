import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from 'src/app/core/interfaces/lead/lead';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss']
})
export class LeadListComponent implements OnInit {

  @Input() leadStatus: number;
  statusString: string;

  displayedColumns: string[] = ['customer', 'createdDate', 'jobAddress'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  leadArray: Lead[];
  dataSource: MatTableDataSource<Lead>;

  isLoading: boolean = true;

  noResults: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      this.statusString = params.get('status') as string;
      this.dataSource = new MatTableDataSource();
      this.getLeads(this.statusString);
    })
  }

  ngOnInit(): void {
    this.getLeads();
  }

  getLeads(status?: string) {
    if (status) {
      switch (status) {
        case "pending":
          this.leadStatus = 0;
          break;
        case "unscheduled":
          this.leadStatus = 1;
          break;
        case "reschedule":
          this.leadStatus = 2;
          break;
        case "approved-dead":
          this.leadStatus = 3;
          break;
      }
    }

    let companyCode = this.localStorage.get("companyCode");
    if (this.leadStatus != undefined) {
      this.apiService.getLeadsByStatus(this.leadStatus?.toString(), companyCode).subscribe({
        next: (response) => {
          console.log(response);
          this.noResults = false;
          this.isLoading = false;
          this.leadArray = response;
          this.dataSource = new MatTableDataSource(this.leadArray);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => {
          this.noResults = true;
          console.error(e);
        }
      })
    }
  }

  goToLead(row: Lead) {
    this.router.navigate(['generate-lead/step2'], { queryParams: { customerid: row.customerId, jobaddressid: row.jobAddressId, leadid: row.leadId } })
  }

  filterLeads(event: Event) {
    const filterString = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterString.trim().toLowerCase();
  }



}
