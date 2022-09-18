import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/core/interfaces/appointment/appointment';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { DaysOfWeek } from 'src/app/core/interfaces/days-of-week';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { Lead } from 'src/app/core/interfaces/lead/lead';
import { Availability } from 'src/app/core/interfaces/smart-scheduler/availability';
import { ApiService } from 'src/app/core/services/api/api.service';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { daysOfWeek } from 'src/app/shared/stores/days-of-week';

interface AppointmentType {
  value: number;
  name: string;
}

interface Filters {
  orderBy?: string;
  preferredDays?: string[];
  timeRange?: TimeRange;
}

interface TimeRange {
  startTime?: string,
  endTime?: string
}

@Component({
  selector: 'app-smart-scheduler',
  templateUrl: './smart-scheduler.component.html',
  styleUrls: ['./smart-scheduler.component.scss']
})
export class SmartSchedulerComponent implements OnInit {

  filterForm = this.fb.group({
    // dateRange: new FormGroup({
    //   startDate: new FormControl(),
    //   endDate: new FormControl(),
    // }),
    orderBy: new UntypedFormControl(),
    preferredDays: new UntypedFormControl(),
    timeRange: new UntypedFormGroup({
      startTime: new UntypedFormControl(),
      endTime: new UntypedFormControl(),
    })
  });

  orderByOptions: string[] = [
    'ADL High',
    'ADL Low',
    'Closing % asc',
    'Closing % desc',
    'Employee Name',
    'Future Appointments asc',
    'Future Appointments desc'
  ];

  days: DaysOfWeek[] = daysOfWeek;

  filters: Filters;

  jobInfo: JobAddressInfo;

  customer: Customer;

  lead: Lead;

  appointment: Appointment;

  availabilityData: Availability[];

  filteredData: Availability[] = [];

  displayData: Availability[];

  isLoading: boolean = true;
  slotSelected: boolean = false;

  appointmentTypes: AppointmentType[] = [
    { value: 0, name: "Initial" },
    { value: 1, name: "Reset" },
    { value: 2, name: "Revisit" }
  ]

  selectedType: AppointmentType;


  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorage: LocalStorageService,
    private idbService: IdbService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let leadId: string = params['leadid'];
      let customerId: string = params['customerid'];
      let jobAddressId: string = params['jobAddressid'];

      this.apiService.getJobAddressInfo(customerId, jobAddressId).subscribe({
        next: (data) => {
          this.jobInfo = data;

          this.apiService.getLeadData(leadId).subscribe({
            next: (lead) => {
              console.log(lead);
              this.lead = lead;

              if (this.lead && this.jobInfo) {
                console.log('test');
                let company_Code = this.localStorage.get('companyCode');
                // name is just the name of the temp table for the smart scheduler
                let userName = this.localStorage.get('userName').split('@')[0];
                let geoZone = this.lead.geoZoneId as number;
                let leadType = this.lead.confirmLeadType as number;
                let jobAddress = `${this.jobInfo.jobAddress}${this.jobInfo.jobCity}, ${this.jobInfo.jobState} ${this.jobInfo.jobZip}`;
                console.log(company_Code, userName, geoZone, leadType, jobAddress);

                this.apiService.getSmartSchedulerData(company_Code, userName, geoZone, leadType, jobAddress).subscribe({
                  next: (response) => {
                    console.log(response);
                    this.availabilityData = response.value;
                    this.displayData = this.availabilityData;
                    this.isLoading = false;
                  },
                  error: (e) => {
                    console.error(e);
                  }
                });
              }
            },
            error: (e) => {
              console.error(e);
            }
          });
        },
        error: (e) => {
          console.error(e);
        }
      });
    });
  }

  updateFilters(): Filters {
    let newFilters: Filters = {
      timeRange: {}
    };

    if (this.filterForm.get('orderBy')?.value) {
      newFilters.orderBy = this.filterForm.get('orderBy')?.value;
    }
    if (this.filterForm.get('preferredDays')?.value) {
      newFilters.preferredDays = this.filterForm.get('preferredDays')?.value;
    }
    if (this.filterForm.get('timeRange.startTime')?.value) {
      newFilters.timeRange!.startTime = this.filterForm.get('timeRange.startTime')?.value;
    }
    if (this.filterForm.get('timeRange.endTime')?.value) {
      newFilters.timeRange!.endTime = this.filterForm.get('timeRange.endTime')?.value;
    }

    return newFilters;
  }

  resetFilters() {
    this.isLoading = true;
    this.filterForm.reset();
    this.filteredData = [] as Availability[];
    this.displayData = [] as Availability[];

    let userName = this.localStorage.get('userName').split('@')[0];
    this.apiService.getProcessedAvailability(userName).subscribe({
      next: (response) => {
        console.log(response);
        this.availabilityData = response;
        this.displayData = this.availabilityData;
        this.isLoading = false;
      }
    })
  }

  filterAvailability(data: Availability[]) {
    let filters = this.updateFilters();
    let start = filters.timeRange?.startTime as string;
    let end = filters.timeRange?.endTime as string;
    this.filterByTime(data, start, end);

    this.displayData = this.availabilityData;
  }

  filterByTime(data: Availability[], startingTime?: string, endingTime?: string) {
    if (startingTime && endingTime) {
      let start = startingTime + ":00";
      let end = endingTime + ":00";

      data.forEach(availability => {
        availability.employees.forEach(emp => {
          emp.slots = emp.slots.filter(slot => {
            return slot.startTime >= start && slot.endTime <= end;
          })
        })
        this.filteredData.push(availability);
      });
    }
    else if (startingTime && !endingTime) {
      let start = startingTime + ":00";

      data.forEach(availability => {
        availability.employees.forEach(emp => {
          emp.slots = emp.slots.filter(slot => {
            return slot.startTime >= start
          })
        })
        this.filteredData.push(availability);
      });
    }
    else if (endingTime && !startingTime) {
      let end = endingTime + ":00";

      data.forEach(availability => {
        availability.employees.forEach(emp => {
          emp.slots = emp.slots.filter(slot => {
            return slot.endTime <= end;
          })
        })
        this.filteredData.push(availability);
      });
    }
    else {
      return
    }
  }

  finalizeAppointment(appointmentData: Appointment) {
    console.log(appointmentData);
    this.appointment = appointmentData;
    this.slotSelected = true;
  }

  updateTypeValue(event: MatSelectChange) {
    switch (event.value) {
      case 0:
        this.appointment.appointmentType = 0;
        this.appointment.appointmentTypeName = "Initial";
        break;
      case 1:
        this.appointment.appointmentType = 1;
        this.appointment.appointmentTypeName = "Reset";
        break;
      case 2:
        this.appointment.appointmentType = 2;
        this.appointment.appointmentTypeName = "Revisit";
        break;
    }
  }

  scheduleAppointment(appointmentData: Appointment) {
    this.apiService.createAppointment(appointmentData).subscribe({
      next: (response) => {
        console.log(response);
        this.lead.status = 4;
        this.apiService.updateLead(this.lead).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['dashboard']);
          }
        })
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
