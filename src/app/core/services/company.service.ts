import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private http = inject(HttpClient);
  private env = environment;

  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.env.companies);
  }

  getCompanyById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.env.companies}/${id}`);
  }

  createCompany(company: any): Observable<any> {
    return this.http.post<any>(this.env.companies, company);
  }

  updateCompany(id: number | string, company: any): Observable<any> {
    return this.http.put<any>(`${this.env.companies}/${id}`, company);
  }

  getEntitiesRegistry(): Observable<any[]> {
    return this.http.get<any[]>(this.env.entitiesRegistry);
  }
}
