import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { EstimatorAvailability } from 'src/app/core/interfaces/estimator-availability';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { LeadType } from 'src/app/core/interfaces/lead/lead-type';
import { ApiService } from 'src/app/core/services/api/api.service';
import { NewAvailabilityComponent } from '../new-availability/new-availability.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userId: string;

  userData: NewUser;
  estimatorFlag: boolean = false;

  availability: EstimatorAvailability[];

  geoZones: GeoZoneFull[];
  leadTypes: LeadType[];

  isLoading: boolean = false;

  edit: boolean = false;
  editButtonText: string = 'Edit Availability';
  addButtonText: string = 'Add Availability';

  compRef: ComponentRef<NewAvailabilityComponent>;
  compFlag: boolean;

  @ViewChild('appendHere', { read: ViewContainerRef }) tab: ViewContainerRef;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      this.apiService.getUserData(this.userId).subscribe({
        next: (user: NewUser[]) => {
          console.log(user);
          this.userData = user[0];
          if (this.userData.userRoleName === 'Estimator') {
            this.estimatorFlag = true;
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
    this.apiService.getAllGeoZones().subscribe({
      next: (zones) => {
        zones.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        this.geoZones = zones;
      }
    });

    this.apiService.getLeadTypes().subscribe({
      next: (types) => {
        types.sort((a, b) => {
          if (a.leadTypeName < b.leadTypeName) {
            return -1;
          } else if (a.leadTypeName > b.leadTypeName) {
            return 1;
          } else {
            return 0;
          }
        });
        this.leadTypes = types;
      }
    });
  }

  getUserAvailability(userId: string) {
    this.apiService.getEstimatorAvailability(userId).subscribe({
      next: (availability: EstimatorAvailability[]) => {
        this.availability = availability;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  handleTabChange(tab: MatTabChangeEvent) {
    if (tab.index === 1) {
      this.isLoading = true;
      this.getUserAvailability(this.userId);
    }
  }

  addNewAvailabilityComponent() {
    const componentRef = this.tab.createComponent(NewAvailabilityComponent, { index: 0 });
    componentRef.instance.zones = this.geoZones;
    componentRef.instance.leadTypes = this.leadTypes;
    componentRef.instance.compRef = componentRef;
    this.compRef = componentRef;
    this.compFlag = true;
    this.compRef.onDestroy(() => {
      this.compFlag = false;
      this.getUserAvailability(this.userId);
      this.snackBar.open('Availability created successfully', 'Close', { duration: 3000 });
    })
  }

  editAvailability() {
    // Enable the form in the component
    this.edit = !this.edit;
    this.edit === true ? this.editButtonText = 'Cancel Editing' : this.editButtonText = 'Edit Availability';
    this.toggleForm();
  }

  availabilityUpdated($event: string) {
    console.log($event);
    if ($event === 'edit') {
      this.editAvailability();
      this.getUserAvailability(this.userId);
      this.snackBar.open('Availability updated', 'Close', { duration: 3000 });
    } else {
      this.editAvailability();
      this.getUserAvailability(this.userId);
      this.snackBar.open('Availability deleted', 'Close', { duration: 3000 });
    }
  }

    toggleForm(): boolean {
      return this.edit;
    }
  }
