import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { NewLeadDialogComponent } from '../../components/new-lead-dialog/new-lead-dialog.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss']
})
export class CustomerPageComponent implements OnInit {

  customerId: string;
  customerData: Customer;
  noCustomerMessage: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe(params => this.customerId = params['id']);
  }

  ngOnInit(): void {
    this.apiService.getCustomerById(this.customerId).subscribe({
      next: (response) => {
        console.log(response);
        this.customerData = response;
      },
      error: (e) => {
        this.noCustomerMessage = `No customer found with id ${this.customerId}`;
      }
    })
  }

  addLead() {
    this.apiService.getJobAddresses(this.customerId).subscribe({
      next: (addresses:JobAddressInfo[]) => {
        console.log(addresses);
        if (addresses.length === 1) {
          this.router.navigate(['/generate-lead/step2'], { queryParams: { customerid: this.customerId, jobaddressid: addresses[0].jobAddressId } });
        } else if (addresses.length > 1) {
          this.openNewLeadDialog(addresses);
        }
      }
    })
  }

  openNewLeadDialog(addresses: JobAddressInfo[]) {
    const dialogRef = this.dialog.open(NewLeadDialogComponent, {
      width: '500px',
      data: {
        customerId: this.customerId,
        jobAddresses: addresses
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/generate-lead/step2'], { queryParams: { customerid: this.customerId, jobaddressid: result.jobAddressId } });
      }
    });
  }

}
