import { GeoZoneFull } from "./geo-zone-full";

export interface PrimaryZone {
    id: number;
    geoZones: GeoZoneFull[];
    name: string;
}
