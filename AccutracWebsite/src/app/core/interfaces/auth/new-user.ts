export interface NewUser {
    company_Code: string;
    employeeId: string;
    email: string;
    userId: string;
    userName: string;
    name: string;
    userRoleId: string;
    userRoleName: string;
    isDeleted: boolean;
    isActive: boolean;
}

export class Attachements {
    Jobs: ImageEntity[];
}

export class ImageEntity {
    JobId: number;
    Base64Image: string;
}
