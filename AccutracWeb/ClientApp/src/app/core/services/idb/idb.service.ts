import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { defer, from, Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointment/appointment';
import { NewUser } from '../../interfaces/auth/new-user';
import { idb } from './idb';

@Injectable({
  providedIn: 'root'
})

export class IdbService {

  constructor() { }

  getUser(uid: string): Observable<NewUser | undefined> {
    return defer(() => from(idb.getUser(uid)))
  }

  addUser(user: NewUser): Observable<string> {
    return defer(() => from(idb.addUser(user)))
  }

  deleteUser(uid: string): Observable<void> {
    return defer(() => from(idb.deleteUser(uid)))
  }

  updateUser(user: NewUser): Observable<void> {
    return defer(() => from(idb.updateUser(user)))
  }

  closeDB() {
    idb.db.close();
  }

  clearUsers() {
    return idb.db.clear('users');
  }
}
