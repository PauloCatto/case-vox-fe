import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  private http = inject(HttpClient);
  private url = environment.states;

  constructor() {}

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getCitiesByState(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.states}${uf}/municipios`);
  }
}
