import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _HttpClient: HttpClient) { }

  addBooking(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/Booking/add`, data);
  }

  getTodayBookings(): Observable<any[]> {
    return this._HttpClient.get<any[]>(`${environment.baseUrl}/Booking/today`);
  }

  deleteBooking(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/Booking/delete/${id}`);
  }
}
