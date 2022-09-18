import { AppointmentSlot } from "./appointment-slot";

export interface Employee {
    date: string,
    name: string,
    userId: string,
    slots: AppointmentSlot[]
}
