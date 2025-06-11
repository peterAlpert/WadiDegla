import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Iplayer } from '../Interfaces/iplayer';
import { IViolation } from '../Interfaces/iviolation';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViolationService {

  constructor(private http: HttpClient) { }

  saveViolation(violation: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Violation/add`, violation);
  }

  getMemberViolations(member: Iplayer): Observable<IViolation[]> {
    return this.http.get<IViolation[]>(`${environment.baseUrl}/history?name=${member.memberName}`);
  }
}
