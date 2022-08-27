import { Injectable } from '@angular/core';
import { share, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private onSubject = new Subject<{ key: string, value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  public getStorage() {
    let storage = [];
    for (let i = 0; i < localStorage.length; i++) {
      storage.push({
        key: localStorage.key(i),
        value: JSON.parse(localStorage.getItem(localStorage.key(i) ?? '') ?? '')
      });
    }
    return storage;
  }

  public store(key: string, data: string) {
    localStorage.setItem(key, data);
    this.onSubject.next({ key: key, value: data });
  }

  public clear() {
    localStorage.clear();
  }

  public clearItem(key: string) {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }


  public get(key: string): string {
    return localStorage.getItem(key) ?? '';
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let value;
      try {
        value = JSON.parse(event.newValue ?? '');
      }
      catch (e) {
        value = event.newValue;
      }
      this.onSubject.next({ key: event.key ?? '', value: value });
    }
  }
}
