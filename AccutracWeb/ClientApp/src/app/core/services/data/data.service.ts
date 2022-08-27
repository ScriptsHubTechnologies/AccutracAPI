import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { NewUser } from '../../interfaces/auth/new-user';
import { Estimator } from '../../interfaces/calendar/estimator';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { IdbService } from '../idb/idb.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Sidenav mode observer
  private sidenavModeSubject = new BehaviorSubject('');
  currentMode = this.sidenavModeSubject.asObservable();

  // Current route observer
  private pathSubject = new BehaviorSubject('');
  currentPath = this.pathSubject.asObservable();

  // Uid observer
  private uidSubject = new BehaviorSubject(this.localStorage.get('uid'));
  currentUid = this.uidSubject.asObservable();

  // Calendar select observer
  private selectedEstimator = new BehaviorSubject({ username: '', userid: '' });
  currentEstimator = this.selectedEstimator.asObservable();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private afs: AngularFirestore,
    private localStorage: LocalStorageService,
    private idb: IdbService,
    private apiService: ApiService
  ) {
    this.pathListener();
  }

  initUser(): Observable<string> {
    return this.authService.userDetails().
      pipe(switchMap(userData => this.apiService.getUserData(userData?.uid)
        .pipe(switchMap(userDoc => this.idb.addUser(userDoc[0])))
      ))
  }

  // Update the sidenav's modesubject
  changeMode(mode: string) {
    this.sidenavModeSubject.next(mode);
  }

  // Listen for path changes
  pathListener() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.changePath(event.url);
      };
    });
  }

  // Update the path subject
  changePath(url: string) {
    this.pathSubject.next(url);
  }

  // Update the UID subject/localStorage
  updateUid(uidValue: string) {
    this.localStorage.store('uid', uidValue);
  }

  // Save user data to localstroage
  saveUserData(userObject: NewUser) {
    this.localStorage.store('uid', userObject.userId);
    this.localStorage.store('name', userObject.name);
    this.localStorage.store('userName', userObject.userName);
    this.localStorage.store('email', userObject.email);
    this.localStorage.store('employeCode', userObject.employeeId);
    // Can potentially add the rest later
  }

  // Share calendar select from sidenav to calendar
  changeEstimator(estimator: Estimator | null) {
    if (estimator) {
      this.selectedEstimator.next(estimator);
    } else {
      this.selectedEstimator.next({ username: '', userid: '' });
    }
  }
}
