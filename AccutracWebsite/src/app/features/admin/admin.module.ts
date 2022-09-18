import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NewAvailabilityComponent } from './components/new-availability/new-availability.component';
import { ExistingAvailabilityComponent } from './components/existing-availability/existing-availability.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserListComponent,
    NewUserComponent,
    UserProfilePageComponent,
    UserProfileComponent,
    UserProfileFormComponent,
    NewAvailabilityComponent,
    ExistingAvailabilityComponent,
    NewUserPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GooglePlaceModule
  ]
})
export class AdminModule { }
