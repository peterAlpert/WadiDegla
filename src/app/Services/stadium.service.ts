import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iplayer } from '../Interfaces/iplayer';


@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  private baseUrl = `${environment.baseUrl}/Stade`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Iplayer[]> {
    return this.http.get<Iplayer[]>(`${this.baseUrl}/getAll`);
  }

  addInsult(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-insult/${id}`, {});
  }

  addJoke(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-joke/${id}`, {});
  }

  addFight(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-fight/${id}`, {});
  }

}
