export interface User {
    company_Codes: string[];
    roles?: string[];
    skills?: string[];
    firstName: string;
    lastName: string;
    spectrumID: string;
    email: string;
    isAdmin: boolean;
    uid: string;
    zones?: string[];
    geoZones?: string[];
    userName: string;
}
