import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl, // Importado para tipagem
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent implements OnInit {
  cadastroForm!: FormGroup;
  isEditMode: boolean = false;
  currentId: string | null = null;

  entidadesRegistro = ['Cartório', 'Junta Comercial', 'OAB', 'RFB'];
  estados = ['SP', 'RJ', 'MG', 'RS', 'PR'];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      responsavel: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      dataNascimento: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      entidadeRegistro: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], 
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.cadastroForm.controls;
  }

  public onlyNumbers(
    event: Event,
    controlName: string,
    maxLength: number
  ): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    const originalValue = value.replace(/\D/g, '');
    const limitedValue = originalValue.substring(0, maxLength);

    this.cadastroForm
      .get(controlName)
      ?.setValue(limitedValue, { emitEvent: false });
    input.value = limitedValue;
  }
  
  checkEditMode(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.isEditMode = true;
      this.getData(this.currentId);
    }
  }

  getData(id: string): void {
    const mockData = {
      responsavel: 'João Silva',
      cpf: '12345678900', // Sem pontuação para corresponder ao onlyNumbers/pattern
      dataNascimento: '1990-01-01',
      nomeFantasia: 'Empresa Exemplo',
      entidadeRegistro: 'Junta Comercial',
      cep: '12345678', // Sem pontuação para corresponder ao onlyNumbers/pattern
      endereco: 'Rua A, 123',
      bairro: 'Centro',
      complemento: 'Sala 1',
      cidade: 'São Paulo',
      estado: 'SP',
    };

    this.cadastroForm.patchValue(mockData);
    
    this.cadastroForm.markAsPristine(); 
    this.cadastroForm.markAsUntouched();
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      if (this.isEditMode) {
        this.updateEntry();
      } else {
        this.createEntry();
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Please fill in all required fields correctly!');
    }
  }

  createEntry(): void {
    console.log('Creating new entry:', this.cadastroForm.value);
    // Substituir por lógica de notificação/modal de sucesso
    this.router.navigate(['/']); 
  }

  updateEntry(): void {
    console.log('Updating entry id', this.currentId, this.cadastroForm.value);
    // Substituir por lógica de notificação/modal de sucesso
    this.router.navigate(['/']); 
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
