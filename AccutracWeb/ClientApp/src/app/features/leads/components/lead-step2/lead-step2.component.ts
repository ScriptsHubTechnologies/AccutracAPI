import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { Customersearch } from 'src/app/core/interfaces/customer/customersearch';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { Lead } from 'src/app/core/interfaces/lead/lead';
import { LeadSource } from 'src/app/core/interfaces/lead/lead-source';
import { LeadSubSource } from 'src/app/core/interfaces/lead/lead-sub-source';
import { LeadType } from 'src/app/core/interfaces/lead/lead-type';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { FormProvider } from '../../form-provider';

@Component({
  selector: 'app-lead-step2',
  templateUrl: './lead-step2.component.html',
  styleUrls: ['./lead-step2.component.scss']
})
export class LeadStep2Component implements OnInit {

  leadSources: LeadSource[];

  leadSubSources: LeadSubSource[];

  leadTypes: LeadType[];

  formStep2: UntypedFormGroup;

  jobInfo: JobAddressInfo;
  customer: Customer;

  customerId: string;
  jobAddressId: string;
  leadid: string;

  existingLead: Lead;

  constructor(
    private formProvider: FormProvider,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.formStep2 = formProvider.getForm().get('step2') as UntypedFormGroup;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerid'];
      this.jobAddressId = params['jobaddressid'];
      this.apiService.getJobAddressInfo(this.customerId, this.jobAddressId).subscribe({
        next: (data: JobAddressInfo) => {
          console.log(data);
          this.jobInfo = data;

          if (params['leadid']) {
            this.leadid = params['leadid'];
            this.apiService.getLeadData(this.leadid).subscribe({
              next: (leadData) => {
                this.existingLead = leadData;
                this.fillLeadData(this.existingLead);
              }
            })
          }
        }
      });
    });

    this.apiService.getLeadSources().subscribe((sources) => {
      this.leadSources = sources;
    });

    this.apiService.getLeadTypes().subscribe((types) => {
      this.leadTypes = types;
    });
  }

  getSubSources(id: number, fillLead?: boolean, subSourceId?: number) {
    this.formStep2.get('leadSource.secondarySource')?.setValue('');
    this.formStep2.get('leadSource.secondarySource')?.markAsUntouched();
    this.apiService.getSubSources(id + 1).subscribe((subSources) => {
      this.leadSubSources = subSources;

      if (fillLead && subSourceId) {
        this.formStep2.get('leadSource.secondarySource')?.setValue(subSourceId);
      }
    });
  }

  saveLead(route: string) {
    if (this.formStep2.valid) {

      let newLead = this.buildLead();
      console.log('newlead', newLead);

      if (this.leadid) {
        this.apiService.updateLead(newLead).subscribe({
          next: (response) => {

            switch (route) {
              case 'dashboard': {
                this.router.navigate([route]);
                break;
              }
              case 'appointment/scheduling': {
                this.router.navigate([route], { queryParams: { customerid: newLead.customerId, jobAddressid: this.jobInfo.jobAddressId, leadid: this.leadid } });
                break;
              }
              default: {
                this.router.navigate(['dashboard']);
              }
            }
          }
        })
      }
      else {
        this.apiService.createLead(newLead).subscribe({
          next: (response) => {

            switch (route) {
              case 'dashboard': {
                this.router.navigate([route]);
                break;
              }
              case 'appointment/scheduling': {
                this.router.navigate([route], { queryParams: { customerid: newLead.customerId, jobAddressid: this.jobInfo.jobAddressId, leadid: response } });
                break;
              }
              default: {
                this.router.navigate(['dashboard']);
              }
            }
          },
          error: (e) => {
            console.error(e);
          }
        });
      }

    } else {
      this.formStep2.markAllAsTouched();
    }
  }

  buildLead(): Lead {
    let sourceId = this.formStep2.get('leadSource.source')?.value;
    let sourceName = this.leadSources[sourceId - 1]?.name;

    let subSourceId = this.formStep2.get('leadSource.secondarySource')?.value;
    let chosenSubSource = this.leadSubSources.find(subSource => subSource?.id == subSourceId);

    let leadType = this.formStep2.get('leadInfo.leadType')?.value;

    let newLead: Lead = {
      company_Code: this.localStorage.get("companyCode"),
      customerId: this.customerId,
      leadSourceId: sourceId,
      leadSourceName: sourceName,
      leadSubSourceId: this.formStep2.get('leadSource.secondarySource')?.value,
      leadSubSourceName: chosenSubSource?.name as string,
      confirmLeadType: leadType,
      // status needs to be dynamic
      status: 0,
      createdBy: this.localStorage.get("name")
    }

    if (this.formStep2.get('leadSource.referredBy')?.value) {
      newLead.referredBy = this.formStep2.get('leadSource.referredBy')?.value;
    }

    if (this.formStep2.get('notesForSales.notes')?.value) {
      newLead.notes = this.formStep2.get('notesForSales.notes')?.value;
    }

    if (this.leadid) {
      newLead.leadId = this.leadid;
      newLead.createdDate = this.existingLead.createdDate;
      newLead.updatedDate = new Date();
      newLead.updatedBy = this.localStorage.get("name");
    }

    if (this.jobInfo) {
      let jobAddressString = `${this.jobInfo.jobAddress}${this.jobInfo.jobCity}, ${this.jobInfo.jobState} ${this.jobInfo.jobZip}`;
      newLead.jobAddressId = this.jobAddressId;
      newLead.jobAddress = jobAddressString;
    }

    return newLead;
  }

  fillLeadData(lead: Lead) {
    let leadTypeId = lead.confirmLeadType as number;

    this.formStep2.get('leadSource.source')?.setValue(lead.leadSourceId);
    this.formStep2.get('leadSource.referredBy')?.setValue(lead.referredBy);
    this.formStep2.get('leadInfo.leadType')?.setValue(this.leadTypes[leadTypeId].leadType);
    this.formStep2.get('notesForSales.notes')?.setValue(lead.notes);

    this.getSubSources(lead.leadSourceId - 1, true, lead.leadSubSourceId);
  }
}
