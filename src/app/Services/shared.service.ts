import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // الكنترول نيم
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

  // التوكن
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable();

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  constructor() { }
}
