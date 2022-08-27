import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { State } from 'src/app/core/interfaces/misc/state';
import { ApiService } from 'src/app/core/services/api/api.service';
import { states } from 'src/app/shared/stores/states-data-store';
import { FormProvider } from '../../form-provider';
import { Router } from '@angular/router';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { JobAddress } from 'src/app/core/interfaces/job-address/job-address';
import { Geozone } from 'src/app/core/interfaces/job-address/geozone';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { IdbService } from 'src/app/core/services/idb/idb.service';

@Component({
  selector: 'app-lead-step1',
  templateUrl: './lead-step1.component.html',
  styleUrls: ['./lead-step1.component.scss']
})
export class LeadStep1Component implements OnInit {
  userName: string;

  formStep1: UntypedFormGroup;

  differentAddress: boolean = false;
  public states: State[] = states;

  isLoading: boolean = false;
  noResults: boolean = false;

  customers: Customer[] = [];

  autoCompleteOptions: Options = {
    fields: ['address_components'],
    componentRestrictions: { country: 'us' }
  }

  constructor(
    private formProvider: FormProvider,
    private router: Router,
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private idbService: IdbService
  ) {
    this.formStep1 = formProvider.getForm().get('step1') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.idbService.getUser(this.localStorage.get("uid")).subscribe(user => {
      this.userName = user?.name as string;
    })

    this.formStep1.get('mailingAddress')?.disable();
    this.formStep1.get('commercial')?.disable();
  }

  handleAddressChange(address: Address, inputElement: HTMLInputElement) {

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

    if (inputElement.id == 'job-input') {
      this.formStep1.get('jobAddress.street')?.setValue(addressObject.street);
      this.formStep1.get('jobAddress.city')?.setValue(addressObject.city);
      this.formStep1.get('jobAddress.state')?.setValue(addressObject.state);
      this.formStep1.get('jobAddress.zip')?.setValue(addressObject.zip);
    } else if (inputElement.id == 'mailing-input') {
      this.formStep1.get('mailingAddress.street')?.setValue(addressObject.street);
      this.formStep1.get('mailingAddress.city')?.setValue(addressObject.city);
      this.formStep1.get('mailingAddress.state')?.setValue(addressObject.state);
      this.formStep1.get('mailingAddress.zip')?.setValue(addressObject.zip);
    }

  }

  createCustomer() {
    if (this.formStep1.valid) {

      let newCustomer = this.buildCustomer();

      let newCustomerId: number;

      this.apiService.createCustomer(newCustomer).subscribe(newId => {
        newCustomerId = newId;

        if (newCustomerId) {
          let zipCode = this.formStep1.get('jobAddress.zip')?.value;
          let geoZone: Geozone;

          this.apiService.getGeoZoneByZip(zipCode).subscribe(zone => {
            geoZone = zone;

            if (geoZone) {
              let newJobAddress = this.buildJobAddress(newCustomerId, geoZone);
              this.apiService.createJobAddress(newJobAddress).subscribe(jobAddressId => {
                this.router.navigate(['generate-lead/step2'], { queryParams: { customerid: newCustomerId, jobaddressid: jobAddressId } });
              })
            }
          })
        }
      })
    } else {
      this.formStep1.markAllAsTouched();
    }
  }

  buildCustomer(): Customer {
    let newCustomer: Customer = {
      company_Code: this.localStorage.get("companyCode"),
      firstName: '',
      lastName: '',
      mailingAddress: this.formStep1.get('jobAddress.street')?.value,
      mailingCity: this.formStep1.get('jobAddress.city')?.value,
      mailingState: this.formStep1.get('jobAddress.state')?.value,
      mailingZip: this.formStep1.get('jobAddress.zip')?.value,
      phone: this.formStep1.get('contact.phone')?.value,
      phoneType: this.formStep1.get('contact.phoneType')?.value,
      createdBy: this.localStorage.get("name")
    }

    if (this.formStep1.get('residential')?.enabled) {
      newCustomer.firstName = this.formStep1.get('residential.firstName')?.value;
      newCustomer.lastName = this.formStep1.get('residential.lastName')?.value;
    } else if (this.formStep1.get('commercial')?.enabled) {
      newCustomer.companyName = this.formStep1.get('commercial.companyName')?.value;
      newCustomer.firstName = this.formStep1.get('commercial.firstName')?.value;
      newCustomer.lastName = this.formStep1.get('commercial.lastName')?.value;
    }

    if (this.formStep1.get('mailingAddress')?.enabled) {
      newCustomer.mailingAddress = this.formStep1.get('mailingAddress.street')?.value;
      newCustomer.mailingCity = this.formStep1.get('mailingAddress.city')?.value;
      newCustomer.mailingState = this.formStep1.get('mailingAddress.state')?.value;
      newCustomer.mailingZip = this.formStep1.get('mailingAddress.zip')?.value;
    }

    if (this.formStep1.get('contact.email')?.value) {
      newCustomer.email = this.formStep1.get('contact.email')?.value;
    }

    return newCustomer;
  }

  buildJobAddress(custId: number, zone: Geozone): JobAddress {
    let newJobAddress: JobAddress = {
      company_Code: this.localStorage.get("companyCode"),
      customerId: custId.toString(),
      jobAddress1: this.formStep1.get('jobAddress.street')?.value,
      jobCity: this.formStep1.get('jobAddress.city')?.value,
      jobState: this.formStep1.get('jobAddress.state')?.value,
      jobZip: this.formStep1.get('jobAddress.zip')?.value,
      createdBy: this.localStorage.get("name"),
      geoZoneId: zone.geoZoneId,
      geoZoneName: zone.geoZoneName,
      zoneId: zone.zoneId,
      zoneName: zone.zoneName
    }

    return newJobAddress;
  }

  toggleMailingAddress() {
    this.differentAddress = !this.differentAddress;
    if (!this.differentAddress) {
      this.formStep1.get('mailingAddress')?.disable();
    } else {
      this.formStep1.get('mailingAddress')?.enable();
    }
  }

  toggleNameGroups() {
    if (this.formStep1.get('commercial')?.disabled) {
      this.formStep1.get('commercial')?.enable();
      this.formStep1.get('residential')?.disable();
    } else {
      this.formStep1.get('commercial')?.disable();
      this.formStep1.get('residential')?.enable();
    }
  }

}
