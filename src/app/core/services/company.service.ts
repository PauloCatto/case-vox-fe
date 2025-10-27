import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Company } from '../../shared/interfaces/company.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private http = inject(HttpClient);
  private env = environment;

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.env.companies);
  }

  getCompanyById(id: number | string): Observable<Company> {
    return this.http.get<Company>(`${this.env.companies}/${id}`);
  }

  createCompany(company: any): Observable<Company> {
    return this.http.post<Company>(this.env.companies, company);
  }

  updateCompany(id: number | string, company: any): Observable<Company> {
    return this.http.put<Company>(`${this.env.companies}/${id}`, company);
  }

  getEntitiesRegistry(): Observable<{ key: string | number; value: string }[]> {
    return this.http.get<{ key: string | number; value: string }[]>(
      this.env.entitiesRegistry
    );
  }
}
