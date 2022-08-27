import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { Geozone } from 'src/app/core/interfaces/job-address/geozone';
import { JobAddress } from 'src/app/core/interfaces/job-address/job-address';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-new-job-address-dialog',
  templateUrl: './new-job-address-dialog.component.html',
  styleUrls: ['./new-job-address-dialog.component.scss']
})
export class NewJobAddressDialogComponent implements OnInit {

  customerId: string;

  autoCompleteOptions: Options = {
    fields: ['address_components'],
    componentRestrictions: { country: 'us' },
  }

  jobAddressForm = this.fb.group({
    jobAddress: new UntypedFormGroup({
      streetAddress: new UntypedFormControl('', Validators.required),
      city: new UntypedFormControl('', Validators.required),
      state: new UntypedFormControl('', Validators.required),
      zip: new UntypedFormControl('', Validators.required)
    })
  })

  constructor(
    public dialogRef: MatDialogRef<NewJobAddressDialogComponent>,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.customerId = this.data.customerId;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createJobAddress() {
    let zip = this.jobAddressForm.get('jobAddress.zip')?.value;

    let test = this.apiService.getGeoZoneByZip(zip).subscribe({
      next: (geozone) => {
        this.geoZone = geozone;

        let newJobAddress = this.buildJobAddress();
        console.log(newJobAddress);

        this.apiService.createJobAddress(newJobAddress).subscribe({
          next: (results) => {
            this.dialogRef.close(results);
          },
          error: (e) => {
            console.error(e);
          }
        })
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  geoZone: Geozone;

  buildJobAddress() {
    let jobAddress: JobAddress = {
      company_Code: this.localStorage.get('companyCode'),
      customerId: this.customerId,
      jobAddress1: this.jobAddressForm.value.jobAddress.streetAddress,
      jobCity: this.jobAddressForm.value.jobAddress.city,
      jobState: this.jobAddressForm.value.jobAddress.state,
      jobZip: this.jobAddressForm.value.jobAddress.zip,
      createdDate: new Date(),
      createdBy: this.localStorage.get('name'),
      geoZoneId: this.geoZone.geoZoneId,
      geoZoneName: this.geoZone.geoZoneName,
      zoneId: this.geoZone.zoneId,
      zoneName: this.geoZone.zoneName
    }

    return jobAddress;
  }

  fillAddress(address: Address) {
    let addressObject = {
      street: '',
      city: '',
      state: '',
      zip: ''
    }

    let components = address?.address_components;

    components.forEach(component => {
      if (component.types[0] == 'street_number') {
        addressObject.street += component.long_name
      }
      if (component.types[0] == 'route') {
        addressObject.street += ` ${component.long_name}`
      }
      if (component.types[0] == 'locality') {
        addressObject.city += component.long_name
      }
      if (component.types[0] == 'administrative_area_level_1') {
        addressObject.state += component.short_name
      }
      if (component.types[0] == 'postal_code') {
        addressObject.zip += component.long_name
      }
    })

    this.jobAddressForm.get('jobAddress.streetAddress')?.setValue(addressObject.street);
    this.jobAddressForm.get('jobAddress.city')?.setValue(addressObject.city);
    this.jobAddressForm.get('jobAddress.state')?.setValue(addressObject.state);
    this.jobAddressForm.get('jobAddress.zip')?.setValue(addressObject.zip);
  }

}
