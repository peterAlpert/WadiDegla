import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private controlNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('controlName'));
  controlName$ = this.controlNameSubject.asObservable();

  setControlName(name: string) {
    localStorage.setItem('controlName', name);
    this.controlNameSubject.next(name);
  }

  clearControlName() {
    localStorage.removeItem('controlName');
    this.controlNameSubject.next(null);
  }

  constructor() { }
}
