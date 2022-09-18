export interface JobAddress {
    company_Code?: string;
    jobAddressId?: number;
    customerId: string;
    jobAddress1: string;
    jobAddress2?: string;
    jobCity: string;
    jobState: string;
    jobZip: string;
    createdDate?: Date;
    createdBy?: string;
    updatedDate?: Date;
    updatedBy?: string;
    geoZoneId?: number;
    geoZoneName?: string;
    zoneId?: number;
    zoneName?: string;
}
