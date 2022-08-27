export interface Appointment {
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
}
