import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NewUserComponent } from 'src/app/features/admin/components/new-user/new-user.component';
import { NewUser } from '../../interfaces/auth/new-user';
import { GeoZoneFull } from '../../interfaces/geo-zone-full';
import { LeadType } from '../../interfaces/lead/lead-type';
import { PrimaryZone } from '../../interfaces/primary-zone';
import { Role } from '../../interfaces/role';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: ApiService
  ) { }

  // User Data Observer
  private userDataSubject = new BehaviorSubject({} as NewUser);
  currentUserData = this.userDataSubject.asObservable();

  emitUserData(userData: NewUser) {
    this.userDataSubject.next(userData);
  }

  getRoles(): Observable<Role[]> {
    let roleSubject = new Subject<Role[]>();
    this.apiService.getRoles().subscribe({
      next: (roles: Role[]) => {
        roleSubject.next(roles);
      }
    })
    return roleSubject.asObservable();
  }

  getLeadTypes() {
    let typeSubject = new Subject<LeadType[]>();
    this.apiService.getLeadTypes().subscribe({
      next: (leadTypes: LeadType[]) => {
        typeSubject.next(leadTypes);
      }
    })
    return typeSubject.asObservable();
  }

  getZones() {
    let zoneSubject = new Subject<PrimaryZone[]>();
    this.apiService.getAllGeoZones().subscribe({
      next: (geoZones: GeoZoneFull[]) => {
        let zones: PrimaryZone[] = [];
        geoZones.forEach(zone => {           
          let zoneExists = zones.find(z => z.id === zone.zoneId);
          if (zoneExists) {
            let index = zones.indexOf(zoneExists);
            zones[index].geoZones.push(zone);
          } else {
            let primaryZone: PrimaryZone = { id: zone.zoneId, geoZones: [zone], name: zone.zoneName };
            zones.push(primaryZone);
          }
        })
        zones.sort((a, b) => a.id < b.id ? -1 : 1);
        zoneSubject.next(zones);
      },
      error: (e) => {
        console.error(e);
      }
    })
    return zoneSubject.asObservable();
  }
}
