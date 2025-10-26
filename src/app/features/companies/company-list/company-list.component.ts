import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent {
  editing: boolean = false;
  selectedOrder: any | null = null;
  orders: any[] = [];
  entidadeRegistro = [
    { key: 107305, value: 'Cartório' },
    { key: 107306, value: 'Junta Comercial' },
    { key: 107308, value: 'OAB' },
    { key: 107309, value: 'RFB' },
  ];

  public router = inject(Router);
  private companyService = inject(CompanyService);
  private destroy$ = new Subject<void>();
  ngOnInit() {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService
      .getCompanies()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.orders = data ?? [];
        },
        error: (err) => {
          this.orders = [];
          console.error('Error loading companies:', err);
        },
      });
  }

  viewOrder(order: any) {
    this.selectedOrder = order;
    this.editing = true;
  }

  editOrder(order: any) {
    if (order && order.id) {
      this.router.navigate(['/company-registration', order.id]);
    }
  }

  formatCpf(cpf?: string): string {
    return cpf?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') ?? '-';
  }

  formatCep(cep?: number | string): string {
    if (!cep) return '-';
    const s = cep.toString().padStart(8, '0');
    return s.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  getEntidadeName(key?: number): string {
    return this.entidadeRegistro.find((e) => e.key === key)?.value ?? '-';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
