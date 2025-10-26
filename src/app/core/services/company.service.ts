import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}

  private http = inject(HttpClient);
  private url: string = environment.companies;

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getCompanyById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.url, company);
  }

  updateCompany(id: number | string, company: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, company);
  }
}
