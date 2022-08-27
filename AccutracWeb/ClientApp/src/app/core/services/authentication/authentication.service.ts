import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { LoginData } from '../../interfaces/auth/login-data';
import firebase from 'firebase/compat/app';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  claimData: any;

  currentUser: firebase.User | null = null;
  private authStatusSubject = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private localStorage: LocalStorageService
  ) {
    this.authStatusListener();
  }

  authStatusListener() {
    this.afAuth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.checkForExpiredToken();
        this.authStatusSubject.next(user);
      } else {
        this.localStorage.clear();
        this.authStatusSubject.next(null);
      }
    })
  }

  // Come back to this
  checkForExpiredToken() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          console.log(idTokenResult);
          if (idTokenResult.claims['exp'] < idTokenResult.claims['auth_time']) {
            console.log('Token expired');
            this.logout();
          }
        });
      }
    });

    // this.afAuth.onAuthStateChanged((user) => {
    //   let sessionTimeout = null;
    //   if (user === null) {
    //     sessionTimeout && clearTimeout(sessionTimeout);
    //     sessionTimeout = null;
    //   } else {
    //     user.getIdTokenResult().then((idTokenResult) => {
    //       console.log(idTokenResult);

    //       const authTime = idTokenResult.claims['auth_time'];
    //       const expTime = idTokenResult.claims['exp'];
    //       console.log(authTime, expTime);

    //       const sessionDuration = 1000 * 60 * 60 * 24;
    //       const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
    //       console.log(millisecondsUntilExpiration);
    //       //sessionTimeout = setTimeout(() => this.logout(), millisecondsUntilExpiration);
    //     });
    //   }
    // });
  }

  login({ email, password, companyCode }: LoginData) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.localStorage.clear();
    return this.afAuth.signOut();
  }

  userDetails() {
    return this.afAuth.user;
  }

  testCustomClaims() {
    this.afAuth.idTokenResult.subscribe((data) => {
      this.claimData = data;
    })
  }

}
