import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(async (authState) => {
        if (!authState) {
          this.router.navigate(['/auth']);
          return false
        }
        const token = await authState.getIdTokenResult();
        if (!token.claims?.['admin']) {
          this.router.navigate(['/auth']);
          return false
        }
        return true
      })
    )
  }
  
}
