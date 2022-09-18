import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { NewJobAddressDialogComponent } from '../new-job-address-dialog/new-job-address-dialog.component';

@Component({
  selector: 'app-customer-job-addresses',
  templateUrl: './customer-job-addresses.component.html',
  styleUrls: ['./customer-job-addresses.component.scss']
})
export class CustomerJobAddressesComponent implements OnInit {

  jobAddresses: JobAddressInfo[];

  geoZones: GeoZoneFull[];
  zones: GeoZoneFull[];

  @Input() customerId: string;

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.apiService.getJobAddresses(this.customerId).subscribe({
      next: (jobAddressInfo) => {
        console.log(jobAddressInfo);
        this.jobAddresses = jobAddressInfo;
      }
    })

    this.apiService.getAllGeoZones().subscribe({
      next: (results) => {
        results.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        this.geoZones = results;
        this.getSortedZones(this.geoZones);
      }
    });
  }


  addJobAddress() {
    const dialogRef = this.dialog.open(NewJobAddressDialogComponent, {
      data: {
        customerId: this.customerId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.getJobAddresses(this.customerId).subscribe({
          next: (jobAddressInfo) => {
            console.log(jobAddressInfo);
            this.jobAddresses = jobAddressInfo;
          }
        })
      }
    });
  }

  getSortedZones(zones: GeoZoneFull[]) {
    const sortedZones: GeoZoneFull[] = [];
    zones.filter(zone => {
      if (sortedZones.find(sortedZone => sortedZone.zoneName === zone.zoneName)) {
        return false;
      }
      sortedZones.push(zone);
      return true;
    })

    this.zones = sortedZones;

    this.zones.sort((a, b) => {
      if (a.zoneName < b.zoneName) {
        return -1;
      } else if (a.zoneName > b.zoneName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
