import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  getEntriesByMemberId(memberId: number) {
    return this.http.get(`${environment.baseUrl}/Entry/by-member/${memberId}`);
  }

  addEntry(entry: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Entry/register-entry`, entry);
  }
}
