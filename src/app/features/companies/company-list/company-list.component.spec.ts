import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyListComponent } from './company-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CompanyService } from '../../../core/services/company.service';
import { ToastService } from '../../../core/services/toast.service';
import { Company } from '../../../shared/interfaces/company.interfaces';
import { Router } from '@angular/router';

const toastServiceMock = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error'),
  info: jasmine.createSpy('info'),
};

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let companyService: jasmine.SpyObj<CompanyService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: Router;

  beforeEach(async () => {
    const companyServiceSpy = jasmine.createSpyObj('CompanyService', [
      'getCompanies',
    ]);

    await TestBed.configureTestingModule({
      imports: [CompanyListComponent, RouterTestingModule],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(
      CompanyService
    ) as jasmine.SpyObj<CompanyService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router);

    companyService.getCompanies.and.returnValue(of([]));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getCompanies on init', () => {
    fixture.detectChanges();
    expect(companyService.getCompanies).toHaveBeenCalled();
  });

  describe('getCompanies', () => {
    it('should load companies successfully', () => {
      const mockCompanies: Company[] = [
        { id: '1', empresa: { ds_nome_fantasia: 'Test Co' } } as Company,
      ];
      companyService.getCompanies.and.returnValue(of(mockCompanies));

      component.getCompanies();

      expect(companyService.getCompanies).toHaveBeenCalled();
      expect(component.orders).toEqual(mockCompanies);
      expect(component.loading).toBeFalse();
    });

    it('should handle empty company list', () => {
      companyService.getCompanies.and.returnValue(of([]));
      component.getCompanies();
      expect(component.orders).toEqual([]);
    });

    it('should handle null response from service', () => {
      companyService.getCompanies.and.returnValue(of(null as any));
      component.getCompanies();
      expect(component.orders).toEqual([]);
    });

    it('should handle error when loading companies', () => {
      const errorResponse = new Error('Failed to load');
      companyService.getCompanies.and.returnValue(
        throwError(() => errorResponse)
      );
      spyOn(console, 'error');

      component.getCompanies();

      expect(companyService.getCompanies).toHaveBeenCalled();
      expect(component.orders).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Erro ao carregar empresas');
      expect(toastService.error).toHaveBeenCalledWith(
        'Erro ao carregar empresas. Por favor, tente novamente.'
      );
      expect(component.loading).toBeFalse();
    });
  });

  it('should set selectedOrder and editing flag on viewOrder', () => {
    const mockOrder: Company = {
      id: '1',
      empresa: { ds_nome_fantasia: 'View Co' },
    } as Company;
    component.viewOrder(mockOrder);
    expect(component.selectedOrder).toBe(mockOrder);
    expect(component.editing).toBeTrue();
  });

  describe('editOrder', () => {
    it('should navigate to edit page with order id', () => {
      const mockOrder: Company = {
        id: '2',
        empresa: { ds_nome_fantasia: 'Edit Co' },
      } as Company;
      const navigateSpy = spyOn(router, 'navigate');

      component.editOrder(mockOrder);

      expect(navigateSpy).toHaveBeenCalledWith(['/company-registration', '2']);
    });

    it('should not navigate if order or order.id is missing', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.editOrder({} as Company);
      expect(navigateSpy).not.toHaveBeenCalled();

      component.editOrder({ id: null } as unknown as Company);
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });

  describe('Formatters', () => {
    it('should format CPF correctly', () => {
      expect(component.formatCpf('12345678901')).toBe('123.456.789-01');
      expect(component.formatCpf('123')).toBe('123');
      expect(component.formatCpf(undefined)).toBe('-');
    });

    it('should format CEP correctly', () => {
      expect(component.formatCep('12345678')).toBe('12345-678');
      expect(component.formatCep(12345678)).toBe('12345-678');
      expect(component.formatCep('12345')).toBe('00012-345');
      expect(component.formatCep(undefined)).toBe('-');
    });

    it('should format date correctly', () => {
      const date = new Date('2023-10-27T12:00:00Z');
      const dateStr = date.toISOString();
      expect(component.formatDate(dateStr)).toBe('27/10/2023');
      expect(component.formatDate(undefined)).toBe('-');
    });

    it('should get entity name correctly', () => {
      expect(component.getEntityName('OAB')).toBe('OAB');
      expect(component.getEntityName('RFB')).toBe('RFB');
      expect(component.getEntityName('Inexistente')).toBe('-');
      expect(component.getEntityName(undefined)).toBe('');
      expect(component.getEntityName()).toBe('');
    });
  });

  it('should complete destroy$ subject on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });
});
