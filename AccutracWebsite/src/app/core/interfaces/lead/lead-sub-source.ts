export interface LeadSubSource {
    id: number,
    name: string,
    leadSourceId: number,
    createdDate: string,
    createdBy?: string,
    updatedDate?: string,
    updatedBy: string,
    isDeleted: boolean
}
