import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';

@Component({
  selector: 'app-job-address-form',
  templateUrl: './job-address-form.component.html',
  styleUrls: ['./job-address-form.component.scss']
})
export class JobAddressFormComponent implements OnInit {

  @Input() jobAddress: JobAddressInfo;
  @Input() geoZones: GeoZoneFull[];
  @Input() zones: GeoZoneFull[];
  @Input() index: number;

  jobAddressForm = this.fb.group({
    jobAddress: new UntypedFormGroup({
      streetAddress: new UntypedFormControl('', Validators.required),
      city: new UntypedFormControl('', Validators.required),
      state: new UntypedFormControl('', Validators.required),
      zip: new UntypedFormControl('', Validators.required),
      zone: new UntypedFormControl('', Validators.required),
      geoZone: new UntypedFormControl('', Validators.required)
    })
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { this.fillAddressForm(); }

  fillAddressForm() {
    this.jobAddressForm.patchValue({
      jobAddress: {
        streetAddress: this.jobAddress.jobAddress,
        city: this.jobAddress.jobCity,
        state: this.jobAddress.jobState,
        zip: this.jobAddress.jobZip,
        zone: this.jobAddress.zoneId,
        geoZone: this.jobAddress.geoZoneId
      }
    });

    this.jobAddressForm.disable();

  }
}
