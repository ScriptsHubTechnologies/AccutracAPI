import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { DaysOfWeek } from 'src/app/core/interfaces/days-of-week';
import { EstimatorAvailability } from 'src/app/core/interfaces/estimator-availability';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { LeadType } from 'src/app/core/interfaces/lead/lead-type';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { daysOfWeek } from 'src/app/shared/stores/days-of-week';

@Component({
  selector: 'app-new-availability',
  templateUrl: './new-availability.component.html',
  styleUrls: ['./new-availability.component.scss']
})
export class NewAvailabilityComponent implements OnInit {

  days: DaysOfWeek[] = daysOfWeek;
  geoZones: GeoZoneFull[];
  leadTypes: LeadType[];
  userData: NewUser;
  componentRef: ComponentRef<NewAvailabilityComponent>;

  @Input()
  set zones(input: GeoZoneFull[]) {
    this.geoZones = input;
  }

  @Input()
  set types(input: LeadType[]) {
    this.leadTypes = input;
  }

  @Input()
  set compRef(input: ComponentRef<NewAvailabilityComponent>) {
    this.componentRef = input;
  }

  @Output() deleteNewAvailability = new EventEmitter();

  autoCompleteOptions: Options = {
    fields: ['address_components'],
    componentRestrictions: { country: 'us' }
  };

  availabilityForm = this.fb.group({
    dayOfWeek: new UntypedFormControl('', Validators.required),
    startTime: new UntypedFormControl('', Validators.required),
    endTime: new UntypedFormControl('', Validators.required),
    startLocation: new UntypedFormControl('', Validators.required),
    startDate: new UntypedFormControl('', Validators.required),
    appointmentDuration: new UntypedFormControl('', Validators.required),
    geoZones: new UntypedFormControl('', Validators.required),
    leadTypes: new UntypedFormControl('', Validators.required)
  })

  constructor(
    private fb: UntypedFormBuilder,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe(data => {
      this.userData = data
    });
  }

  addressString: string = '';

  fillAddress(address: Address) {

    let components = address?.address_components;

    components.forEach(component => {
      if (component.types[0] == 'street_number') {
        this.addressString += component.long_name;

      }
      if (component.types[0] == 'route') {
        this.addressString += ` ${component.long_name}`

      }
      if (component.types[0] == 'locality') {
        this.addressString += `, ${component.long_name}`

      }
      if (component.types[0] == 'administrative_area_level_1') {
        this.addressString += `, ${component.short_name}`

      }
      if (component.types[0] == 'postal_code') {
        this.addressString += `, ${component.long_name}`
      }
    });

    this.availabilityForm.get('startLocation')?.setValue(this.addressString);
  }

  onSubmit() {
    if (this.availabilityForm.valid) {
      let newAvail = this.buildAvailabilityObject();
      this.apiService.createEstimatorAvailability(newAvail).subscribe({
        next: (res) => {
          this.destroySelf();
        },
        error: (e) => {
          console.error(e);
        }
      });
    } else {
      this.availabilityForm.markAllAsTouched();
      this.availabilityForm.markAsDirty();
    }
  }

  buildAvailabilityObject(): EstimatorAvailability {
    let newAvailability: EstimatorAvailability = {
      company_Code: this.localStorageService.get('companyCode'),
      userId: this.userData.userId,
      wkDayName: this.days[this.availabilityForm.get('dayOfWeek')?.value - 1].wkDayName,
      wkDayNumber: this.availabilityForm.get('dayOfWeek')?.value,
      startDate: this.availabilityForm.get('startDate')?.value,
      startTime: this.availabilityForm.get('startTime')?.value,
      endTime: this.availabilityForm.get('endTime')?.value,
      startLocation: this.availabilityForm.get('startLocation')?.value,
      isDeleted: false,
      createdBy: this.localStorageService.get('name'),
      createdDate: new Date(),
      appointmentDuration: this.availabilityForm.get('appointmentDuration')?.value,
      geoZones: this.availabilityForm.get('geoZones')?.value,
      leadTypes: this.availabilityForm.get('leadTypes')?.value,
      name: this.userData.name,
      uniqueid: self.crypto.randomUUID(),
      employeeCode: this.userData.employeeId
    }

    return newAvailability;
  }

  destroySelf() {
    this.componentRef.destroy();
  }

}
