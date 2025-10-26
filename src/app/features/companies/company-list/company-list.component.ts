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
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
orders: any[] = [
    {
      id: 1,
      responsible: 'Fulano de tal',
      companyName: 'Nome da empresa',
      cpf: '999.999.999-99',
      address: 'Nome da rua',
      neighborhood: 'Nome do bairro',
      city: 'Nome da cidade',
      cep: '99999-999',
      complement: 'Complemento',
      uf: 'PB',
      number: '123',
    },
    {
      id: 1,
      responsible: 'Fulano de tal',
      companyName: 'Nome da empresa',
      cpf: '999.999.999-99',
      address: 'Nome da rua',
      neighborhood: 'Nome do bairro',
      city: 'Nome da cidade',
      cep: '99999-999',
      complement: 'Complemento',
      uf: 'PB',
      number: '123',
    },
    {
      id: 1,
      responsible: 'Fulano de tal',
      companyName: 'Nome da empresa',
      cpf: '999.999.999-99',
      address: 'Nome da rua',
      neighborhood: 'Nome do bairro',
      city: 'Nome da cidade',
      cep: '99999-999',
      complement: 'Complemento',
      uf: 'PB',
      number: '123',
    }
  ];
  editing = false;
  selectedOrder: any | null = null;

  private router = inject(Router);
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
          //this.orders = data ?? [];
          console.log('Companies loaded:', data);
        },
        error: (err) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
