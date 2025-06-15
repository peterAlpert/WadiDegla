import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private http: HttpClient) { }

  getEntriesByMemberId(memberId: number) {
    return this.http.get(`${environment.baseUrl}/Entry/by-member/${memberId}`);
  }
}
