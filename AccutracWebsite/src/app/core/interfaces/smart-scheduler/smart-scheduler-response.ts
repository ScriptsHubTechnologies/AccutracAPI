import { Availability } from "./availability";

export interface SmartSchedulerResponse {
    contentType: string | null;
    statusCode: number;
    value: Availability[];
}
