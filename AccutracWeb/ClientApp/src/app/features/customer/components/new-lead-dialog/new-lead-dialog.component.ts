import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';

@Component({
  selector: 'app-new-lead-dialog',
  templateUrl: './new-lead-dialog.component.html',
  styleUrls: ['./new-lead-dialog.component.scss']
})
export class NewLeadDialogComponent implements OnInit {

  customerId: string;
  jobAddresses: JobAddressInfo[];
  
  displayedColumns: string[] = ['jobAddress', 'city', 'state', 'zip'];
  dataSource = this.data.jobAddresses;

  selectedAddress: JobAddressInfo;

  constructor(
    public dialogRef: MatDialogRef<NewLeadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.customerId = this.data.customerId;
    this.jobAddresses = this.data.jobAddresses;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirmSelection() {
    console.log(this.selectedAddress);
    this.dialogRef.close(this.selectedAddress);
  }

}
