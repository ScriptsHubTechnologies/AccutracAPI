import { SafeResourceUrl } from "@angular/platform-browser";

export interface Attachment {
  attachmentId?: number;
  company_Code: string;
  customerId?: string;
  jobAddressId?: number;
  functionTable?: string;
  functionId?: number;
  attachmentType: string;
  attachmentName: string;
  attachmentPath?: string;
  attachmentBase64String?: string;
  attachmentUrl?: SafeResourceUrl;
  attachmentByteArray?: any[]
}
