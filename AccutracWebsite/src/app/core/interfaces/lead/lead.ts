export interface Lead {
    company_Code: string;
    leadId?: string;
    customerId: string;
    jobAddressId?: string;
    leadType?: number;
    confirmLeadType?: number;
    referredBy?: string;
    notes?: string;
    status: number;
    createdDate?: Date;
    createdBy?: string;
    updatedDate?: Date;
    updatedBy?: string;
    isDeleted?: boolean;
    leadSourceId: number;
    leadSourceName: string;
    leadSubSourceId: number;
    leadSubSourceName: string;
    customer?: string;
    jobAddress?: string;
    geoZoneId?: number;
    geoZoneName?: string;
}
