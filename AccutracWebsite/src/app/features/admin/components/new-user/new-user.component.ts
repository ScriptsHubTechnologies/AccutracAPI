import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { getFunctions, httpsCallable } from "firebase/functions";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseErrorHandler } from 'src/app/shared/handlers/firebase-handler';

import { getApp } from "firebase/app";
import { connectFunctionsEmulator } from "firebase/functions";
import * as auth from 'firebase/auth';
import { User } from 'src/app/core/interfaces/auth/user';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { GeoZoneFull } from 'src/app/core/interfaces/geo-zone-full';
import { PrimaryZone } from 'src/app/core/interfaces/primary-zone';
import { Role } from 'src/app/core/interfaces/role';
import { LeadType } from 'src/app/core/interfaces/lead/lead-type';
import { UserService } from 'src/app/core/services/user/user.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

// const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, "localhost", 5001);

interface FirebaseUser {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface NewUserFormData {
  profile: {
    firstName: string;
    lastName: string;
    spectrumID: string;
  };
  loginInfo: {
    userEmail: string;
    userPassword: string;
  };
  roles: {
    [key: string]: boolean;
  };
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  emailExists: boolean = false;
  successMessage: string;
  errorMessage: string;

  newUserData: NewUser;

  roles: Role[] = [];
  leadTypes: LeadType[];
  zones: PrimaryZone[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private db: AngularFirestore,
    private apiService: ApiService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.apiService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      }
    });
  }

  createNewUser(userData: NewUserFormData) {
    this.errorMessage = '';
    this.successMessage = '';

    console.log(userData);
    let newFirebaseUser = this.buildFirebaseUser(userData);
    let newUserRole = this.mapSelectedRoles(userData);

    const functions = getFunctions();
    const createUser = httpsCallable(functions, 'createUser');

    if (newFirebaseUser && newUserRole) {
      createUser({ ...newFirebaseUser })
        .then((result) => {
          let uid: string = '';

          if (typeof result.data === 'string') {
            uid = result.data;
          }

          if (uid && newUserRole) {
            let first = userData.profile.firstName;
            let last = userData.profile.lastName;

            let apiUser: NewUser = {
              company_Code: this.localStorage.get('companyCode'),
              employeeId: userData.profile.spectrumID,
              email: userData.loginInfo.userEmail,
              userId: uid,
              userName: userData.loginInfo.userEmail,
              name: `${first} ${last}`,
              userRoleId: newUserRole.rolesId as string,
              userRoleName: newUserRole.name as string,
              isDeleted: false,
              isActive: true
            }

            this.successMessage = `User created with uid of ${uid}`

            this.apiService.createUser(apiUser).subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (e) => {
                console.error(e);
              }
            })
          }
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.details.code);
          this.errorMessage = FirebaseErrorHandler.Parse(error.details.code);
        })
    }
  }

  buildFirebaseUser(userData: NewUserFormData): FirebaseUser | undefined {
    let newFirebaseUser: FirebaseUser = {
      email: userData.loginInfo.userEmail,
      password: userData.loginInfo.userPassword,
      isAdmin: userData.roles['Admin']
    }
    console.log(newFirebaseUser);
    return newFirebaseUser;
  }

  mapSelectedRoles(formData: NewUserFormData): Role | undefined {
    let selectedRole: Role;
    for (let key in formData.roles) {
      if (formData.roles[key]) {
        let test = this.roles.find(r => r.name === key);
        if (test) {
          selectedRole = test;
          return selectedRole
        }
      }
    }
    return undefined;
  }

}
