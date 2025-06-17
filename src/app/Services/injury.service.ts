import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InjuryService {

  constructor(private http: HttpClient) { }

  addInjury(injury: any) {
    return this.http.post(`${environment.baseUrl}/Injuries/add`, injury);
  }

  getByMemberId(memberId: number) {
    return this.http.get(`${environment.baseUrl}/Injuries/GetByMemberId/${memberId}`);
  }
}
