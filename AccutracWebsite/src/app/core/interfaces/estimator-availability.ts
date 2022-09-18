export interface EstimatorAvailability {
    id?: string;
    company_Code: string;
    userId: string;
    name: string;
    wkDayNumber: number;
    wkDayName: string;
    startDate: Date;
    startTime: string;
    endTime: string;
    startLocation: string;
    isDeleted: boolean;
    createdBy: string;
    createdDate: Date;
    employeeCode: string;
    appointmentDuration: number;
    leadTypes: string[];
    geoZones: string[];
    uniqueid: string;
}
