import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/core/interfaces/appointment/appointment';
import { Lead } from 'src/app/core/interfaces/lead/lead';
import { AppointmentSlot } from 'src/app/core/interfaces/smart-scheduler/appointment-slot';
import { Availability } from 'src/app/core/interfaces/smart-scheduler/availability';
import { Employee } from 'src/app/core/interfaces/smart-scheduler/employee';
import { ApiService } from 'src/app/core/services/api/api.service';
import { formatDate } from '@angular/common';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Output() appointmentData: EventEmitter<{
    company_Code: string;
    appointmentId?: string;
    customerId: string;
    leadId: string;
    appointmentType?: number;
    appointmentTypeName?: string;
    createdDate?: Date;
    createdBy?: string;
    isApproved?: boolean;
    status: number;
    statusName: string;
    assignedTo: string;
    assignedName: string;
    date: string;
    startTime: string;
    endTime: string;
    isDeleted?: boolean;
    deleteReason: string;
  }> = new EventEmitter();

  availabilityData: Employee;
  leadData: Lead;
  backlog: number = 0;
  dailyCap: number;

  @Input()
  set dataCheck(input: Employee) {
    this.availabilityData = input;
  }

  @Input()
  set leadDataCheck(input: Lead) {
    this.leadData = input;
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.dailyCap = this.availabilityData.slots.length;
    this.availabilityData.slots.forEach(slot => {
      if (slot.taken == 1) {
        this.backlog++;
      }
    })
  }
  
  buildAppointment(slot: AppointmentSlot, lead: Lead) {
    let appointmentDate = formatDate(slot.date, 'yyyy-MM-dd', 'en-US');    

    let appointment: Appointment = {
      company_Code: this.localStorage.get('companyCode'),
      customerId: lead.customerId,
      leadId: lead.leadId as string,
      createdBy: this.localStorage.get('name'),
      status: 1,
      statusName: 'Open',
      date: appointmentDate,
      appointmentType: 0,
      appointmentTypeName: "Initial",
      startTime: slot.startTime,
      endTime: slot.endTime,
      assignedTo: slot.userid,
      assignedName: slot.employee,
      isDeleted: false,
      deleteReason: ""
    }

    this.appointmentData.emit(appointment);
  }
}
