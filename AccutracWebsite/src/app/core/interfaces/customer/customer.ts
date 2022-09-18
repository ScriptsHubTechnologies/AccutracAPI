export interface Customer {
    company_Code: string;
    companyName?: string;
    customerid?: string;
    jobAddressId?: number;
    customerType?: number;
    firstName: string;
    lastName: string;
    jobAddress1?: string;
    jobAddress?: string;
    jobCity?: string;
    jobState?: string;
    jobZip?: string;
    mailingAddress?: string;
    mailingAddress2?: string;
    mailingCity?: string;
    mailingState?: string;
    mailingZip?: number;
    email?: string;
    phone: string;
    phoneType?: string;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: string;
    notes?: string;
}